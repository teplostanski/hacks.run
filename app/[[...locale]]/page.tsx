import { notFound } from "vinext/shims/navigation";
import Home from "../../components/Home";
import { localeOptions } from "../../lib/i18n";
import { routeLocale, type LocaleRouteProps } from "../../lib/locale-route";

export const dynamicParams = false;

export function generateStaticParams() {
  return localeOptions.map(({ value }) => ({ locale: value === "en" ? [] : [value] }));
}

export default async function Page({ params }: LocaleRouteProps) {
  const locale = routeLocale((await params).locale);
  if (!locale) notFound();
  return <Home locale={locale} />;
}
