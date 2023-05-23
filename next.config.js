/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.net-a-porter.com',
        port: '',
        pathname: '/variants/images/**',
      },
    ],
  }
}

module.exports = nextConfig
