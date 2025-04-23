/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    baseUrl: process.env.BASE_URL,
    apiKey: process.env.X_APY_KEY
  }
};

export default nextConfig;
