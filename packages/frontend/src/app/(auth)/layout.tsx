"use client";

import { ErrorBoundary } from "@rollbar/react";
import { useEffect } from "react";
import { AuthLayout, AuthLayoutProps } from "@flexmvp/components";
import config from "@flexmvp/config";
import { useAutoSignInListener, useRedirectClient } from "@flexmvp/hooks";
import { useAuthState } from "@flexmvp/stores";

export default function Layout({
  children,
  sidebar,
  ...props
}: AuthLayoutProps) {
  // Automatically redirect logged in users to homepage
  const authState = useAuthState();
  const redirectClient = useRedirectClient();
  useEffect(() => {
    if (authState?.cognitoUser) {
      // redirect to dashboard
      redirectClient(config.homepageUrl);
    }
  }, [authState, redirectClient]);

  // TODO: Refactor to components
  return (
    <AuthLayout sidebar={sidebar} {...props}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </AuthLayout>
  );
}
