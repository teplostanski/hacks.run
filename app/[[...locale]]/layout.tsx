import type { ReactNode } from "react";
import "../globals.css";
import { LanguageProvider } from "../../components/LanguageProvider";
import { messages, localeOptions, localePath } from "../../lib/i18n";
import { routeLocale, type LocaleRouteProps } from "../../lib/locale-route";
export async function generateMetadata({ params }: LocaleRouteProps) {
  const locale = routeLocale((await params).locale) ?? "en";
  const t = messages[locale];
  return {
    title: t.title,
    description: t.metaDescription,
    metadataBase: new URL("https://hacks.run"),
    icons: { icon: "/favicon.svg" },
    alternates: {
      canonical: localePath(locale),
      languages: {
        ...Object.fromEntries(localeOptions.map(({ value }) => [value, localePath(value)])),
        "x-default": "/",
      },
    },
  };
}
export default async function RootLayout({
  children,
  params,
}: LocaleRouteProps & { children: ReactNode }) {
  const locale = routeLocale((await params).locale) ?? "en";
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var theme;try{theme=localStorage.getItem('hacks.run.theme')}catch{}document.documentElement.dataset.theme=theme==='dark'||(theme!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light'})()`,
          }}
        />
        <script>console.log("ฅ₍^•⩊ •マⳊ &gt;_ Happy hacking!");</script>
      </head>
      <body>
        <LanguageProvider locale={locale}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
