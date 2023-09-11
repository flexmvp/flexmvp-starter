// "use client";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import NProgress from "nprogress";
import { useEffect } from "react";

// NProgress.configure({ parent: "#theme" });

export function onStart() {
  NProgress.start();
}

export function onComplete() {
  NProgress.done();
}

export async function redirectServer(path: string) {
  // console.log("👽 redirectServer.path", path);
  try {
    onStart();
    await redirect(path);
  } catch (error) {
    // console.log("🚨 redirectServer.error", error);
    onComplete();
  }
  // window.location.href = path;
}

export function useRedirectClient() {
  const { push } = useRouter();
  // TODO: Load pathname, searchParams like useOnRouteComplete, check if redirect is needed
  return async function redirectClient(path: string) {
    // console.log("👽 redirectClient.path", path);
    // try server redirect first
    try {
      await redirectServer(path);
    } catch {
      // fail silently and try client redirect
      onComplete();
    }
    try {
      onStart();
      await push(path);
    } catch (error) {
      console.log("🚨 redirectClient.error", error);
      onComplete();
    }
  };
}

export function useOnRouteComplete() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => onComplete(), [pathname, searchParams]);
}
