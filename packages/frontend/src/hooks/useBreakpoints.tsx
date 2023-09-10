import tailwindConfig from "@flexmvp/../tailwind.config"; // Adjust this to your tailwind.config.js path
import { ne } from "drizzle-orm";
import { useMediaQuery } from "react-responsive";
import { Config } from "tailwindcss";
import resolveConfig from "tailwindcss/resolveConfig";
import { KeyValuePair } from "tailwindcss/types/config";

if (!tailwindConfig) throw new Error("Tailwind config not found");
const fullConfig = resolveConfig(tailwindConfig as Config);
const breakpoints = fullConfig?.theme?.screens as KeyValuePair<
  string,
  string | Screen | Screen[]
>;

/**
 * useBreakpoints Hook
 *
 * Provides a set of flags for the TailwindCSS breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`).
 * Each flag indicates whether the viewport width is greater than or equal to that breakpoint.
 *
 * @returns {Object} - An object containing flags for each breakpoint.
 * @example
 * const { sm, md, lg, xl, 2xl } = useBreakpoints();
 * if (md) {
 *   // Current viewport width is at least the width of the `md` breakpoint
 * }
 */
export function useBreakpoints() {
  if (breakpoints === undefined) {
    throw new Error(
      "TailwindCSS breakpoints not found. Check your tailwind.config.js file."
    );
  }
  const sm = useMediaQuery({ query: `(min-width: ${breakpoints.sm})` });
  const md = useMediaQuery({ query: `(min-width: ${breakpoints.md})` });
  const lg = useMediaQuery({ query: `(min-width: ${breakpoints.lg})` });
  const xl = useMediaQuery({ query: `(min-width: ${breakpoints.xl})` });
  const _2xl = useMediaQuery({ query: `(min-width: ${breakpoints["_2xl"]})` });

  return {
    sm,
    md,
    lg,
    xl,
    _2xl,
  };
}

// Implementation in your component:
/*
const {
  sm,
  md,
  lg,
  xl,
  _2xl
} = useBreakpoints();
*/
