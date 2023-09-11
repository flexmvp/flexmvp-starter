"use client";

import { ErrorBoundary, Provider } from "@rollbar/react"; // Provider imports 'rollbar'
import React, { ReactNode } from "react";

const rollbarConfig = {
  accessToken: process.env.NEXT_PUBLIC_ROLLBAR_ACCESS_TOKEN,
  environment: process.env.NEXT_PUBLIC_APP_STAGE,
};

function TestError() {
  const a = null;
  throw new Error("Test error");
  return a;
}

interface RollbarBoundaryProps {
  children: ReactNode;
}

// Provider instantiates Rollbar client instance handling any uncaught errors or unhandled promises in the browser
// ErrorBoundary catches all React errors in the tree below and logs them to Rollbar
export default function RollbarBoundary({ children }: RollbarBoundaryProps) {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        {/* <TestError /> */}
        {children}
      </ErrorBoundary>
    </Provider>
  );
}
