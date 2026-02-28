/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/math-fast',
  assetPrefix: '/math-fast/',
  images: {
    unoptimized: true,
  },
}

export default nextConfig