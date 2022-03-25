import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// The .env file will actually be present in the parent repo
dotenv.config({ path: "../.env" });

export const PORT = 3000;

export default defineConfig({
  root: process.cwd(),
  // plugins: [react()],
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  define: {
    "process.env.SHOPIFY_API_KEY": JSON.stringify(process.env.SHOPIFY_API_KEY),
  },
  server: {
    port: PORT,
    middlewareMode: "html",
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 64999,
      clientPort: 64999,
    },
    proxy: {
      "^/api/.*": {
        target: "http://127.0.0.1:8081",
        changeOrigin: false,
        secure: true,
        ws: false,
      },
      "^/$": {
        target: "http://127.0.0.1:8081",
        changeOrigin: false,
        secure: true,
        ws: false,
      },
    },
  },
});
