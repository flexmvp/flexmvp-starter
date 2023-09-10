"use client";
import React, { useEffect } from "react";
import { useReady } from "@flexmvp/hooks";
import { useRedirectClient } from "@flexmvp/hooks/useOnRouteComplete";
import { useAuthState } from "@flexmvp/stores/authStore";
import { isClient as isClientCheck } from "@flexmvp/utils/renderLocation";
import { Authenticating } from "./Authenticating";

type AuthBoundaryProps = { children: React.ReactNode };
export function AuthBoundary({ children }: AuthBoundaryProps) {
  const {
    cognitoUser,
    refreshUser,
    refreshing,
    refreshFailed,
    refreshSuccessful,
    logout,
  } = useAuthState();
  const isClient = isClientCheck();
  // console.log("AuthBoundry", {
  //   cognitoUser,
  //   isClient,
  //   refreshing,
  //   refreshFailed,
  //   refreshSuccessful,
  // });
  const redirect = useRedirectClient();

  // console.log("☀️ AuthBoundry", {
  //   cognitoUser,
  //   isClient,
  //   refreshing,
  //   refreshFailed,
  //   refreshSuccessful,
  //   redirect,
  //   "window.location.href": !!window ? window?.location?.href : undefined,
  // });

  // Refresh the user from Amplify & server on initial load
  useEffect(() => {
    if (isClient) {
      // TODO: Display modal while checking user auth...
      refreshUser();
    }
  }, [isClient, refreshUser]);

  // if refresh fails, logout the user and redirect to login page
  useEffect(() => {
    if (refreshFailed && isClient) {
      logout();
      redirect("/login");
    }
  }, [refreshFailed, logout, isClient, redirect]);

  // on success, store the current user
  useEffect(() => {
    if (refreshSuccessful) {
      // TODO: fetch user attributes
    }
  }, [refreshSuccessful, isClient, redirect]);

  const { isReady } = useReady();

  if (isReady && cognitoUser) {
    return <>{children}</>;
  } else {
    return <Authenticating />;
  }

  return <>Authentication error</>;
}
