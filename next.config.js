/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "",
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        "fs": false,
        "net": false,
        "tls": false
      }
    }
    return config
  },
  images: {
    domains: [
      "bafybeieupfzol44kx3ruwdnvrisbqp6putm45rcdjxaknh6ixbmhehierq.ipfs.nftstorage.link"
    ]
  }
};

module.exports = nextConfig;
