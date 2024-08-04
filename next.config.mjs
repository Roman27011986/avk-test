import withPlaiceholder from '@plaiceholder/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@plaiceholder/ui"],
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.assets.so',
        pathname: '/furniture.png**',
      },
    ],
  },
};

export default withPlaiceholder(nextConfig);
