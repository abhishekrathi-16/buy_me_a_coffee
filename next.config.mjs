/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: 'buymeacoffee-abhi.s3.eu-north-1.amazonaws.com'
      }
    ],
  },
};

export default nextConfig;
