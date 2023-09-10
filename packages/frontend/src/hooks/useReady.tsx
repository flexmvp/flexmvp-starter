"use client";
import { useCallback, useEffect, useState } from "react";

/**
 * useReady hook to prevent rendering components until the app is ready
 * (prevents client/server hydration mismatch)
 * @returns {isReady, ready}
 */
export function useReady() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, [setIsReady]);

  const ready = useCallback(
    (value: any): typeof value | undefined => {
      if (isReady) return value;
      else return undefined;
    },
    [isReady]
  );

  return { isReady, ready };
}
