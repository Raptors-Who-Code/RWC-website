/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_SUPABASE_STORAGE_DOMAIN],
  },
  async rewrites() {
    return [
      {
        source: "/events",
        destination: "/404",
      },
    ];
  },
};

export default nextConfig;
