"use client";

import { useReady } from "@flexmvp/hooks";
import { useThemeStore } from "@flexmvp/stores/themeStore";
import { ThemeItem } from "./ThemeItem";

export function ThemePicker() {
  const { theme: storeTheme, themes, setTheme } = useThemeStore();

  const { ready } = useReady();
  const theme = ready(storeTheme);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {themes.map((t: string, i: number) => (
        <ThemeItem
          key={`theme_${t}_#${i}`}
          dataTheme={t}
          role="button"
          aria-label="Theme select"
          aria-pressed={t === theme}
          selected={t === theme}
          tabIndex={0}
          onClick={() => {
            setTheme(t);
          }}
          className="basis-1/5"
        />
      ))}
    </div>
  );
}
