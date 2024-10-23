import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['aljdxodkiftsvecuscfp.supabase.co','mighty.tools','images.unsplash.com'], 
      },
};

export default withNextIntl(nextConfig);
