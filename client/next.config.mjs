const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isProd ? '/multiplayer-game' : '',
  assetPrefix: isProd ? '/multiplayer-game/' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig