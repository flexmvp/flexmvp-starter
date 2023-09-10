import { APIGatewayProxyHandlerV2, Handler } from "aws-lambda";
import { Config } from "sst/node/config";

const AWS = require("aws-sdk");
const apiVersion = "2016-04-18";

export const handler: APIGatewayProxyHandlerV2 = async (
  request,
  _context,
  _callback
) => {
  try {
    console.log("🧜‍♂️ verify.handler request: ", request);
    console.log("🧜‍♂️ verify.handler process.env: ", process.env);
    console.log("🧜‍♂️ verify.handler Config: ", Config);
    const cognito = new AWS.CognitoIdentityServiceProvider({
      //your cognito region,
      region: process.env.AWS_REGION,
      apiVersion,
    });

    console.log(
      "🧜‍♂️ verify.handler request.queryStringParameters: ",
      request.queryStringParameters
    );
    const confirmationCode = request.queryStringParameters?.code;
    const username = request.queryStringParameters?.username;
    const clientId = request.queryStringParameters?.clientId;
    const redirectUrl = request.queryStringParameters?.redirectUrl;

    if (!redirectUrl) {
      throw new Error("redirectUrl is required");
    }

    // const appUrl = Config.APP_URL || "http://APP_URL_NOT_SET/";

    const params = {
      ClientId: clientId,
      ConfirmationCode: confirmationCode,
      Username: username,
    };

    const confirmation = await cognito.confirmSignUp(params).promise();
    console.log("🧜‍♂️ verify.handler confirmation: ", confirmation);

    // TODO
    // add user object to database with reference to cognito idenity (params.username is a uuid)

    const redirectResponse = getRedirectResponse(
      redirectUrl,
      "Redirect succesful"
    );
    console.log("🧜‍♂️ verify.handler getRedirectResponse: ", redirectResponse);
    return redirectResponse;
  } catch (err) {
    // return err;
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify("There was an error verifying your account."),
    };
  }
};

const getRedirectResponse = (location: string, message: string) => ({
  statusCode: 302,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Expose-Headers": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
    Location: location, //link for your website here,
  },
  body: JSON.stringify(message),
});
