import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['aljdxodkiftsvecuscfp.supabase.co'], 
      },
};

export default withNextIntl(nextConfig);
