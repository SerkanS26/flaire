// DEVELOPMENT

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// // https://vite.dev/config/
// export default defineConfig({
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
//       "/uploads": {
//         target: "http://localhost:5000",
//       },
//     },
//   },
// });

// PRODUCTION

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Helper function for path aliases
const createAliases = () => ({
  "@": path.resolve(__dirname, "./src"),
  "@components": path.resolve(__dirname, "./src/components"),
  "@assets": path.resolve(__dirname, "./src/assets"),
});

export default defineConfig(({ mode }) => {
  // Load environment variables based on mode
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],

    // Base configuration
    base: env.VITE_BASE_PATH || "/",

    // Resolve configuration
    resolve: {
      alias: createAliases(),
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },

    // Server configuration (development only)
    server: {
      port: 5173,
      strictPort: true,
      proxy:
        mode === "development"
          ? {
              "/api": {
                target: env.VITE_API_URL || "http://localhost:5000",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
              },
              "/uploads": {
                target: env.VITE_API_URL || "http://localhost:5000",
              },
            }
          : undefined,
    },

    // Build configuration
    build: {
      outDir: "dist",
      emptyOutDir: true,
      sourcemap: mode !== "production",
      rollupOptions: {
        output: {
          assetFileNames: "assets/[name]-[hash][extname]",
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
        },
      },
    },
  };
});
