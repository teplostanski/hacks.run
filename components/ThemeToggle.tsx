"use client";
import styles from "./ThemeToggle.module.css";
import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

import { useLanguage } from "./LanguageProvider";

const storageKey = "hacks.run.theme";

export function ThemeToggle() {
  const { t } = useLanguage();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(storageKey);
      } catch {}
      const next = saved === "dark" || (saved !== "light" && media.matches);
      document.documentElement.dataset.theme = next ? "dark" : "light";
      setDark(next);
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) sync();
    };
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("storage", onStorage);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  function toggle() {
    const next = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = next ? "dark" : "light";
    setDark(next);
    try {
      localStorage.setItem(storageKey, next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      className={styles["theme-toggle"]}
      type="button"
      onClick={toggle}
      aria-label={t.darkTheme}
      aria-pressed={dark}
      title={t.toggleTheme}
    >
      <LuMoon className={styles["theme-moon"]} />
      <LuSun className={styles["theme-sun"]} />
    </button>
  );
}
