import * as AWS from "aws-sdk";

const apiVersion = "2016-04-18";

// Initialize AWS Cognito Identity SDK
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  //your cognito region,
  region: process.env.AWS_REGION,
  apiVersion,
});

interface VerifyEmailParams {
  emailAddress: string;
  confirmationCode: string;
  userPoolId?: string;
  clientId?: string;
}
type VerifyEmailReturn =
  AWS.CognitoIdentityServiceProvider.ConfirmSignUpResponse | void;
/**
 * Verifies a Cognito user's email address using a confirmation code.
 *
 * @param emailAddress The email address to verify
 * @param confirmationCode The confirmation code sent to the user's email address
 * @returns a ConfirmSignUpResponse from AWS Cognito
 */
export async function verifyEmail({
  emailAddress,
  confirmationCode,
  userPoolId = process.env.COGNITO_USER_POOL_ID || "",
  clientId = process.env.COGNITO_CLIENT_ID || "",
}: VerifyEmailParams): Promise<VerifyEmailReturn> {
  const params = {
    ClientId: clientId,
    UserPoolId: userPoolId,
    Username: emailAddress,
    ConfirmationCode: confirmationCode,
    ForceAliasCreation: true,
  };

  try {
    const result = await cognitoidentityserviceprovider
      .confirmSignUp(params)
      .promise();
    console.log("🧜‍♂️ verifyEmail result", result);
    if (result.$response.error) throw result.$response.error;
    return result.$response.data;
  } catch (error) {
    console.error("Error during email verification", error);
  }
}
