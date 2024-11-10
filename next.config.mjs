/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'images.unsplash.com', 'images.pexels.com', 'avatars.githubusercontent.com', 'gravatar.com'],
  },
  output: 'standalone',
};

export default nextConfig;
