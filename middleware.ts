import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

const i18nMiddleware = createMiddleware({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "always",
});

export async function middleware(request: NextRequest) {
  const i18nResponse = i18nMiddleware(request);

  if (i18nResponse) {
    return i18nResponse;
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    // Match all routes with locale prefix
    "/(es|en)/:page*",
    // Match all routes except API routes and certain files
    "/((?!api|_next|_vercel|.*\\..*|favicon.ico|robots.txt).*)",
  ],
};
