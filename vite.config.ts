import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    /* host: "vite.demopremium.symposium.events.local",
    port: 3000, */
  },
  build: {
    rollupOptions: {
      /* output: {
        entryFileNames: "process_tickets.js",
        // Renames CSS assets to process_tickets.css when the file has .css extension
        assetFileNames: (assetInfo) =>
          assetInfo.name && assetInfo.name.endsWith(".css")
            ? "process_tickets.css"
            : assetInfo.name || "[name].[ext]",
      }, */
    },
  },
});
