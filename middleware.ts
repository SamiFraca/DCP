import createMiddleware from "next-intl/middleware";

const middleware = createMiddleware({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "always",
});

export default middleware;

export const config = {
  matcher: ["/", "/(es|en)/:page*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
