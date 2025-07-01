/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  env: {
    baseUrl: process.env.BASE_URL
  },
  images: {
    domains: ['localhost']
  }
};

export default nextConfig;
