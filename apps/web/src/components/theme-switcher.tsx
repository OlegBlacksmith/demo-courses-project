"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";
const THEMES: Theme[] = ["light", "dark", "system"];

function readTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : "system";
  } catch {
    return "system";
  }
}

function applyTheme(theme: Theme) {
  const resolved =
    theme === "system"
      ? window.matchMedia(DARK_QUERY).matches
        ? "dark"
        : "light"
      : theme;
  document.documentElement.setAttribute("data-theme", resolved);
}

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function setTheme(theme: Theme) {
  if (theme === "system") localStorage.removeItem(STORAGE_KEY);
  else localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
  listeners.forEach((listener) => listener());
}

export function ThemeSwitcher() {
  const t = useTranslations("Theme");
  const theme = useSyncExternalStore(
    subscribe,
    readTheme,
    (): Theme => "system",
  );

  useLayoutEffect(() => {
    applyTheme(readTheme());
    if (readTheme() !== "system") return;

    const media = window.matchMedia(DARK_QUERY);
    const onChange = () => applyTheme("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  return (
    <div>
      {THEMES.map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={item === theme}
          className="px-2 py-1 rounded aria-pressed:bg-foreground aria-pressed:text-background"
          onClick={() => setTheme(item)}
        >
          {t(item)}
        </button>
      ))}
    </div>
  );
}
