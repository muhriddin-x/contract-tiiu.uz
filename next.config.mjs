/** @type {import('next').NextConfig} */
import nextTranslate from "next-translate-plugin";
const nextConfig = {
  ...nextTranslate(),
  reactStrictMode: true,

  serverRuntimeConfig: {
    backendUrl: global.process.env.BASE_URL,
  },
  publicRuntimeConfig: {
    backendUrl: process.env.BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crmapi.mentalaba.uz",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "crmapi.menstudent.uz",
        pathname: "**",
      },
    ],
  },
  // images: {
  //   domains: ["crmapi.mentalaba.uz"],
  // },
};

export default nextConfig;
