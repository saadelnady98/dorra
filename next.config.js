import createNextIntlPlugin from "next-intl/plugin";

 const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dashboard.dorrattaybah.com",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "dash-dorrataiba.tetane.com",
        pathname: "/storage/**",
      },
    ],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default withNextIntl(nextConfig);
