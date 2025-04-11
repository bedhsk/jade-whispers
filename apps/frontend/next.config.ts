import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    return config;
  },
  // Configuración del servidor
  server: {
    port: 4000,
  },
};

export default nextConfig;
