import {
  VerificationEmailStyle,
  UserPool,
  UserPoolDomain,
} from "aws-cdk-lib/aws-cognito";
import { Cognito, Function, StackContext, use } from "sst/constructs";

export function AuthStack({ stack, app }: StackContext) {
  const stage = stack.stage;
  const name = app.name;

  // Create User Pool
  const auth = new Cognito(stack, "auth", {
    login: ["email"],
    defaults: { function: { environment: { APP_NAME: app.name } } },
    triggers: {
      customMessage: "packages/functions/src/auth/customMessage.handler",
    },
    cdk: {
      userPool: {
        userVerification: {
          // emailSubject: "Verify your new account",
          // emailBody: "Verify your account by clicking on {##Verify Email##}",
          emailStyle: VerificationEmailStyle.CODE,
          // emailStyle: VerificationEmailStyle.LINK,
          // e.g. link = https://auth-flexmvp-starter-chris.auth.us-east-1.amazoncognito.com/confirmUser?client_id=qod0r44gbleg44b1qd4n6rcc6&user_name=6172b89d-276f-4910-98dc-b6c12c9c5db1&confirmation_code=874398
        },
      },
    },
  });

  const domain: UserPoolDomain = auth.cdk.userPool.addDomain(
    "authUserPoolDomain",
    {
      cognitoDomain: {
        domainPrefix: `auth-${name}-${stage}`,
      },
    }
  );

  // Show the API endpoint and other info in the output
  stack.addOutputs({
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
    UserPoolDomain: domain?.domainName,
  });

  return { auth };
}
