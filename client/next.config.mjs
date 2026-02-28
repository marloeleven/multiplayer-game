/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/multiplayer-game',
  assetPrefix: '/multiplayer-game/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig