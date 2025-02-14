import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target:
          process.env.NODE_ENV === "development"
            ? "http://localhost:5000/api"
            : "https://flaire.safrans.dev/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

// import { defineConfig, loadEnv } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), "");

//   const API_TARGET =
//     env.NODE_ENV === "development"
//       ? "http://localhost:5000/api"
//       : "https://flaire.safrans.dev";

//   return {
//     plugins: [react()],
//     resolve: {
//       alias: {
//         "@": path.resolve(__dirname, "./src"),
//       },
//     },
//     server: {
//       proxy: {
//         "/api": {
//           target: API_TARGET,
//           changeOrigin: true,
//           rewrite: (path) => path.replace(/^\/api/, ""),
//         },
//       },
//     },
//     define: {
//       "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV),
//     },
//   };
// });
