import { use, StackContext, Api as ApiGateway, Config } from "sst/constructs";
import { DatabaseStack } from "./Database.js";
import { AuthStack } from "./AuthStack.js";
import { Lazy } from "aws-cdk-lib";

export function ApiStack({ stack, app }: StackContext) {
  const { auth } = use(AuthStack);

  const api = new ApiGateway(stack, "api", {
    authorizers: {
      jwt: {
        type: "user_pool",
        userPool: {
          id: auth.userPoolId,
          clientIds: [auth.userPoolClientId],
        },
      },
      // custom: {
      //   type: "lambda",
      //   handler: "packages/functions/src/auth/authorizer.handler",
      // },
    },
    defaults: {
      authorizer: "jwt",
      function: {
        bind: [use(DatabaseStack)],
        environment: {
          COGNITO_USER_POOL_ID: auth.userPoolId,
          COGNITO_CLIENT_ID: auth.userPoolClientId,
        },
      },
    },
    routes: {
      "POST /graphql": {
        type: "graphql",
        function: {
          handler: "packages/functions/src/graphql/graphql.handler",
          runtime: "nodejs16.x",
        },
        pothos: {
          schema: "packages/functions/src/graphql/schema.ts",
          output: "packages/graphql/schema.graphql",
          commands: [
            "cd packages/graphql && npx @genql/cli --output ./genql --schema ./schema.graphql --esm",
          ],
        },
        // authorizer: "none", // TODO: lock down w/ jwt
      },
      /**
       * Migrate db using Drizzle ORM
       * https://github.com/gabriel-richardson/sst-drizzle-example/blob/ea495d06135fb1383a5b108455471028fefe008d/stacks/MyStack.ts#L33
       **/
      "GET /migrate": {
        function: {
          handler: "packages/functions/src/migrator.handler",
          environment: {
            STAGE: stack.stage,
          },
          copyFiles: [
            {
              from: "packages/core/migrations",
              to: "migrations",
            },
          ],
        },
        authorizer: "none",
      },
      /**
       * Authorization
       */
      "GET /auth/verify": {
        function: "packages/functions/src/auth/verify.handler",
        // function: "packages/functions/src/hello.handler",
        // environment: {
        //   APP_URL: "http://localhost:3000", // TODO: LazyLoad dynamically
        // },
        authorizer: "none",
      },
    },
  });
  const APP_URL = new Config.Parameter(stack, "APP_URL", {
    value: process.env.APP_URL || "http://APP_URL_NOT_SET",
  });
  api.bind([APP_URL]);

  /**
   *  Bind api to load URL
   *
   * https://discord.com/channels/983865673656705025/1100404950493822976/1100404950493822976
   * https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains.html
   *
   * Uses conctatenation to predict the URL because loading api.url will
   * create a circular dependency.
   *
   */
  // uses
  const lazyApiURL = Lazy.string({
    produce() {
      // TODO: use customDomain when provided by .env or Config
      // return `https://${api.id}.execute-api.${app.region}.amazonaws.com/${app.stage}`;
      // SST doesn't append stage to the api.url 🤷‍♂️
      return `https://${api.httpApiId}.execute-api.${app.region}.amazonaws.com`;
    },
  });
  const lazyApiId = Lazy.string({
    produce() {
      return api.id;
    },
  });
  const dangerousHardcodedApiUrl =
    process.env.API_URL || `https://API_URL_NOT_SET`;
  const API_URL = new Config.Parameter(stack, "API_URL", {
    value: dangerousHardcodedApiUrl,
  });
  const APP_NAME = new Config.Parameter(stack, "APP_NAME", { value: app.name });
  auth.bindForTrigger("customMessage", [API_URL, APP_NAME, APP_URL]);

  // allowing authenticated users to access API
  auth.attachPermissionsForAuthUsers(stack, [api]);
  auth.attachPermissionsForUnauthUsers(stack, [api]);

  stack.addOutputs({
    ApiUrl: api.url,
    GraphqlUrl: api.url + "/graphql",
    Stage: app.stage,
    // appUrl: APP_URL,
    // lazyApiURL,
    // lazyApiId,
  });

  return api;
}
