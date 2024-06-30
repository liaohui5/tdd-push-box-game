import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/tdd-push-box-game/",
  test: {
    environment: "happy-dom",
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
