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
  transpilePackages: ["@zerodev", "@web3", "@web3auth"],
  images: {
    domains: [
      "bafybeieupfzol44kx3ruwdnvrisbqp6putm45rcdjxaknh6ixbmhehierq.ipfs.nftstorage.link",
      "bafybeid6tht7ecegrnicq5b46l3vze56bccarofiwn2kdpjphzqaunj474.ipfs.nftstorage.link"
    ]
  }
};

module.exports = nextConfig;
