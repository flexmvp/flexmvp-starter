import axios from "axios";
import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import {
  AuthResponse,
  APIGatewayTokenAuthorizerEvent,
  PolicyDocument,
} from "aws-lambda";

// For AWS Cognito: https://cognito-idp.<region>.amazonaws.com/<user pool id>
// refer to:        http://amzn.to/2fo77UI
const iss = process.env.ISS;

const jwkPems: { [key: string]: string } = {};

// generatePolicy creates a policy document to allow this user on this API:
function generatePolicy(effect: string, resource: string): PolicyDocument {
  const policyDocument = {} as PolicyDocument;
  if (effect && resource) {
    policyDocument.Version = "2012-10-17";
    policyDocument.Statement = [];
    const statementOne: any = {};
    statementOne.Action = "execute-api:Invoke";
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
  }
  return policyDocument;
}

// ValidateToken validates a token against a list of public keys
function ValidateToken(token: string, pems: any): any {
  // Fail if the token is not jwt
  const decodedJwt = jwt.decode(token, { complete: true });
  if (!decodedJwt) {
    throw new Error("invalid JWT token");
  }

  // Fail if token is not from your UserPool
  console.log(
    `Payload.iss = ${(decodedJwt as { [key: string]: any }).payload.iss}`
  );
  console.log(`ISS = ${iss}`);
  if ((decodedJwt as { [key: string]: any }).payload.iss !== iss) {
    throw new Error("invalid issuer");
  }

  // Reject the jwt if it's not an 'Access Token'
  if ((decodedJwt as { [key: string]: any }).payload.token_use !== "access") {
    throw new Error("not an access token");
  }

  // Get the kid from the token and retrieve corresponding PEM
  const kid = (decodedJwt as { [key: string]: any }).header.kid;
  const pem = pems[kid];
  if (!pem) {
    throw new Error("invalid access token");
  }

  try {
    // Verify the signature of the JWT token to ensure it's really coming from your User Pool
    return jwt.verify(token, pem, { issuer: iss });
  } catch (error) {
    throw new Error("invalid signature");
  }
}

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
export async function handler(
  event: APIGatewayTokenAuthorizerEvent
): Promise<AuthResponse> {
  try {
    console.log("🚔 authorizer.handler invoked");

    if (!event.authorizationToken) {
      throw new Error("authorization token not found");
    }

    if (Object.keys(jwkPems).length === 0) {
      // Make a request to the iss + .well-known/jwks.json URL:
      const jwks = await axios
        .get(`${iss}/.well-known/jwks.json`)
        .catch((err) => {
          throw err;
        });
      jwks.data.keys.forEach((k: any) => {
        const jwkArray = {
          kty: k.kty,
          n: k.n,
          e: k.e,
        };
        jwkPems[k.kid] = jwkToPem(jwkArray);
      });
    }

    // Remove 'bearer ' from token:
    const token = event.authorizationToken.substring(7);

    const decoded = ValidateToken(token, jwkPems);

    const policyDoc = generatePolicy("Allow", "*");
    return {
      principalId: decoded.sub,
      policyDocument: policyDoc,
    } as AuthResponse;
  } catch (error) {
    console.error("an error happened during authentication", error);
    throw new Error("Unauthorized");
  }
}
