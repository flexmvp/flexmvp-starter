"use client";
import React from "react";
import { Theme } from "react-daisyui";
import { useOnRouteComplete, useReady } from "@flexmvp/hooks";
// import ReadyModal from "@flexmvp/components/ReadyModal";
import { useThemeStore } from "@flexmvp/stores";

type ThemeWrapperProps = { children: React.ReactNode };
export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  useOnRouteComplete(); // NProgress end event
  const { theme } = useThemeStore();
  const { ready } = useReady();

  return (
    <>
      <Theme dataTheme={ready(theme)} id="theme">
        {children}
        {/* <ReadyModal alwaysVisible /> */}
      </Theme>
    </>
  );
}
