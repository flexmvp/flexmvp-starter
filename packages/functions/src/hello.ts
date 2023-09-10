import { APIGatewayProxyHandlerV2, Handler } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (
  event,
  context,
  callback
) => {
  return {
    statusCode: 200,
    body: JSON.stringify("hello world"),
  };
};
