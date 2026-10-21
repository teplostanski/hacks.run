import { isLocale, type Locale } from "./i18n";

export type LocaleRouteProps = { params: Promise<{ locale?: string[] }> };

export function routeLocale(segments?: string[]): Locale | undefined {
  if (!segments?.length) return "en";
  if (segments.length === 1 && isLocale(segments[0]) && segments[0] !== "en") return segments[0];
  return undefined;
}
