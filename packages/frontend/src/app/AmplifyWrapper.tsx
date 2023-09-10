"use client";
import { Amplify } from "aws-amplify";
import { isServer } from "@flexmvp/utils";
// import { AmplifyStorage } from "@flexmvp/stores";

/**
 * Amplify Configuration for User Identity Pools
 */
const config = {
  Auth: {
    region: process.env.NEXT_PUBLIC_APP_REGION,
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
    signupVerificationMethod: "code",
    // signupVerificationMethod: "link",
    mandatorySignIn: false,
  },
  API: {
    endpoints: [
      {
        name: "api",
        endpoint: process.env.NEXT_PUBLIC_API_URL,
        region: process.env.NEXT_PUBLIC_REGION,
      },
    ],
  },
  // Storage: AmplifyStorage,
};

if (config.Auth?.userPoolId?.includes("NEXT_PUBLIC")) {
  // we are running in the build pipeline without complete environment variables
  console.log("Amplify running in build, skip config");
} else if (isServer()) {
  // skip running on server side to reduce cold start time
} else {
  // we are live on the client, so we can configure Amplify
  Amplify.configure(config);
  // if (process.env.NODE_ENV !== "production")
  // console.log("🚀 Amplify connected", Amplify);
}

type AmplifyWrapperProps = { children: React.ReactNode };
export default function AmplifyWrapper({ children }: AmplifyWrapperProps) {
  return <>{children}</>;
}
