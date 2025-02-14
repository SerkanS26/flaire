// DEVELOPMENT

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";
// import dotenv from "dotenv";

// dotenv.config();

// // https://vite.dev/config/
// export default defineConfig({
//   base: "./",
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:5000/api",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
// });

//PRODUCTION 1

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";
// import dotenv from "dotenv";

// dotenv.config();

// // https://vite.dev/config/
// export default defineConfig({
//   base: "./",
//   plugins: [react()],

//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   server: {
//     port: 3000,
//     host: "0.0.0.0",
//     proxy: {
//       "/api": {
//         target: process.env.VITE_API_URL || "http://localhost:5001/api",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
// });

// PRODUCTION 2
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const API_TARGET = env.VITE_API_URL || "http://localhost:5001";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000, // Frontend port
      host: "0.0.0.0", // Allow external access
      proxy: {
        "/api": {
          target: API_TARGET,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      minify: "terser", // Ensure production optimizations
      sourcemap: false,
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
  };
});
