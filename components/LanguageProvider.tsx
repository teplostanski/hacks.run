"use client";
import { createContext, useContext, type ReactNode } from "react";
import { isLocale, localePath, localeOptions, messages, type Locale } from "../lib/i18n";

const LanguageContext = createContext<Locale | null>(null);

export function LanguageProvider({ children, locale }: { children: ReactNode; locale: Locale }) {
  return <LanguageContext value={locale}>{children}</LanguageContext>;
}

export function useLanguage() {
  const locale = useContext(LanguageContext);
  if (!locale) throw new Error("LanguageProvider is required");
  return { locale, t: messages[locale] };
}

export function LanguageSelect() {
  const { locale, t } = useLanguage();
  return (
    <select
      className="language-select"
      aria-label={t.language}
      value={locale}
      onChange={(event) => {
        const next = event.target.value;
        if (isLocale(next)) window.location.assign(localePath(next) + window.location.hash);
      }}
    >
      {localeOptions.map(({ value, label, name }) => (
        <option key={value} value={value} lang={value} label={label} aria-label={name} title={name}>
          {name}
        </option>
      ))}
    </select>
  );
}
