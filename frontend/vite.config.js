import react from "@vitejs/plugin-react";
import "dotenv/config";
import { defineConfig } from "vite";

const config = defineConfig({
  define: {
    "process.env.SHOPIFY_API_KEY": JSON.stringify(process.env.SHOPIFY_API_KEY),
  },
  plugins: [react()],
  server: {
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 64999,
      clientPort: 64999,
    },
    proxy: {
      "^/api/.*": {
        target: "http://localhost:8081",
        changeOrigin: false,
        secure: true,
      },
    },
  },
});

export default config;
