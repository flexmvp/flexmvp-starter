import { CustomMessageTriggerEvent } from "aws-lambda";
import { Config } from "sst/node/config";

export const handler = async (event: CustomMessageTriggerEvent) => {
  console.log("🍋 customMessage.handler event: ", event);
  console.log("🍋 customMessage.handler process.env: ", process.env);
  console.log("🍋 customMessage.handler Config: ", Config);
  console.log(
    "🍋 customMessage.handler event.callerContext: ",
    event.callerContext
  );

  const { codeParameter } = event.request;
  const { userName, region } = event;
  const { clientId } = event.callerContext;
  const { email } = event.request.userAttributes;

  // clientMetadata added by client Auth.signUp() call (see packages/frontend/src/pages/signup.tsx
  const { apiUrl, appUrl } =
    (event.request?.clientMetadata as {
      appUrl?: string;
      apiUrl?: string;
    }) || {};
  const appName = process.env.APP_NAME;
  let message: string | undefined = undefined;
  let emailSubject: string | undefined = undefined;

  switch (event.triggerSource) {
    case "CustomMessage_SignUp":
    case "CustomMessage_ResendCode":
      const clientLink = `${appUrl}/verify?code=${codeParameter}&username=${userName}&clientId=${clientId}&region=${region}&email=${email}&redirectUrl=${appUrl}`;
      // const serverLink = `${apiUrl}/auth/verify?code=${codeParameter}&username=${userName}&clientId=${clientId}&region=${region}&email=${email}&redirectUrl=${appUrl}`;
      // note: Cognito will not use a custom message unless the {####} CODE placeholder is included
      message = `<p>[FlexMVP]</p>
      <p>Thank you for signing up. <a href='${clientLink}'>Verification Link</a>.</p>
      <p>Verification Code: {####}</p>`;
      // message = `Thank you for signing up. <a href='${clientLink}'>Verification Link</a>.
      // <p>BAD LINK: {##Verify Email##}`;
      emailSubject = `Welcome to ${appName}`;
      break;
    case "CustomMessage_AdminCreateUser":
    case "CustomMessage_ForgotPassword":
    case "CustomMessage_UpdateUserAttribute":
    case "CustomMessage_VerifyUserAttribute":
    case "CustomMessage_Authentication":
    default:
      break;
  }

  if (!!message) {
    event.response.smsMessage = message;
    event.response.emailMessage = message;
  }
  if (!!emailSubject) {
    event.response.emailSubject = emailSubject;
  }

  // TODO: Custom from/reply-to email address

  // TODO: Custom HTML email template from theme

  // console.log("🍋 customMessage.handler event.response: ", event.response);
  return event;
};
/**
 * (property) BaseTriggerEvent<T extends string>.triggerSource:
 * | "CustomMessage_SignUp"
 * | "CustomMessage_AdminCreateUser"
 * | "CustomMessage_ResendCode"
 * | "CustomMessage_ForgotPassword"
 * | "CustomMessage_UpdateUserAttribute"
 * | "CustomMessage_VerifyUserAttribute"
 * | "CustomMessage_Authentication"
 */
