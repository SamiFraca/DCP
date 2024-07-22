import createMiddleware from 'next-intl/middleware';

const middleware = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en'
});

export default middleware;

export const config = {
  matcher: ['/', '/(es|en)/:page*']
};