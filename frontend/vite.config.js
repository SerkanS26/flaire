// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";
// import dotenv from "dotenv";

// dotenv.config();

// // https://vite.dev/config/
// export default defineConfig({
//   base: "/",
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   server: {
//     proxy: {
//       "/api": {
//         target:
//           process.env.NODE_ENV === "development"
//             ? "http://localhost:5000/api"
//             : "https://flaire.safrans.dev/api",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
// });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// export default defineConfig(({ mode }) => {
//   // const env = loadEnv(mode, process.cwd(), "");

//   // const API_TARGET =
//   //   mode === "development"
//   //     ? "http://localhost:5000/api"
//   //     : "https://flaire.safrans.dev/api";

//   return {
//     plugins: [react()],
//     resolve: {
//       alias: {
//         "@": path.resolve(__dirname, "./src"),
//       },
//     },
//     server: {
//       port: 5000,
//       host: "0.0.0.0", // use this to allow external access
//       proxy:
//         mode === "development"
//           ? {
//               "/api": {
//                 target: "http://localhost:5000/api",
//                 changeOrigin: true,
//                 rewrite: (path) => path.replace(/^\/api/, ""),
//               },
//             }
//           : undefined, // Disable proxy in production
//     },
//     define: {
//       "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV),
//     },
//     // define: {
//     //   "process.env.API_URL": JSON.stringify(
//     //     mode === "development" ? "http://localhost:5000/api" : "/api"
//     //   ),
//     // },
//   };
// });

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const API_TARGET =
    mode === "development"
      ? "http://localhost:5000/api"
      : "https://flaire.safrans.dev/api";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 5000,
      host: "0.0.0.0",
      proxy:
        mode === "development"
          ? {
              "/api": {
                target: API_TARGET,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
              },
            }
          : undefined, // Disable proxy in production
    },
    define: {
      "process.env.API_URL": JSON.stringify(API_TARGET),
    },
  };
});
