/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'production-customer-site-public.s3.us-east-2.amazonaws.com',
        },
      ],
    },
    webpack: (config, { isServer }) => {
      // eslint-disable-next-line space-before-blocks
      if (isServer) {
          config.externals = [nodeExternals()];
      }
      return config
  }
}

module.exports = nextConfig
