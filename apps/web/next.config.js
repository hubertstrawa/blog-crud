/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "toverjvtnxnnnwmkgvos.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
