"use client";
import tailwindConfig from "@flexmvp/../tailwind.config";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const themesConfig = tailwindConfig.daisyui.themes;

const DEFAULT_THEMES = themesConfig.reduce((acc: any, curr: string[]) => {
  if (Array.isArray(curr)) {
    return [...acc, ...curr];
  }
  if (typeof curr === "object") {
    return [...acc, ...Object.keys(curr)];
  }
  if (typeof curr === "string") {
    return [...acc, curr];
  }
  return acc;
}, []);

type ThemesType = typeof DEFAULT_THEMES;
type ThemeType = ThemesType[number];

interface ThemeState {
  theme: ThemeType;
  themes: ThemesType;
  setTheme: (x: ThemeType) => void;
}

const DEFAULT_THEME = "light"; // "cyberpunk";

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        theme: DEFAULT_THEME,
        themes: DEFAULT_THEMES,
        setTheme: (nextTheme) => {
          // return;
          set((/* state */) => ({ theme: nextTheme }));
        },
      }),
      {
        name: "theme-storage",
        partialize: (state) => ({ theme: state.theme }),
      }
    )
  )
);

// const DEFAULT_THEMES = [
//   "light",
//   "dark",
//   "cupcake",
//   "bumblebee",
//   "emerald",
//   "corporate",
//   "synthwave",
//   "retro",
//   "cyberpunk",
//   "valentine",
//   "halloween",
//   "garden",
//   "forest",
//   "aqua",
//   "lofi",
//   "pastel",
//   "fantasy",
//   "wireframe",
//   "black",
//   "luxury",
//   "dracula",
//   "cmyk",
//   "autumn",
//   "business",
//   "acid",
//   "lemonade",
//   "night",
//   "coffee",
//   "winter",
// ] as const;
