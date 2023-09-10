import { use, StackContext, NextjsSite } from "sst/constructs";
import { ApiStack } from "./ApiStack.js";
import { AuthStack } from "./AuthStack";

export function FrontendStack({ app, stack }: StackContext) {
  const api = use(ApiStack);
  const { auth } = use(AuthStack);
  const appUrl = process.env.APP_URL;

  const frontend = new NextjsSite(stack, "frontend", {
    path: "packages/frontend",
    customDomain:
      stack.stage === "prod"
        ? {
            domainName: "demo.flexmvp.com",
            hostedZone: "flexmvp.com",
          }
        : undefined,

    // buildCommand: "npm run build",
    // buildOutput: "dist",
    environment: {
      NEXT_PUBLIC_GRAPHQL_URL: api.url + "/graphql",
      NEXT_PUBLIC_APP_URL: appUrl || "http://APP_URL_NOT_SET/",
      NEXT_PUBLIC_API_URL: api.url || "https://API_URL_NOT_SET/",
      NEXT_PUBLIC_APP_REGION: app.region,
      NEXT_PUBLIC_USER_POOL_ID: auth.userPoolId,
      NEXT_PUBLIC_USER_POOL_CLIENT_ID: auth.userPoolClientId,
      NEXT_PUBLIC_FOO: "bar",
    },
  });

  stack.addOutputs({
    AppUrl: appUrl,
    FrontendUrl: frontend.customDomainUrl || frontend.url,
  });
  return { frontend };
}
