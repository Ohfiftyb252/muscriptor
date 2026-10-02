import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const backend =
  process.env.BACKEND_URL ?? "http://127.0.0.1:8222";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: Object.fromEntries(
      [
        "/transcribe",
        "/instruments",
        "/auralize",
        "/health",
        "/soundfonts",
      ].map((path) => [
        path,
        { target: backend, changeOrigin: true, secure: true },
      ]),
    ),
  },
  build: {
    // On Vercel output to web/dist (the outputDirectory in vercel.json).
    // Locally, build into the Python package for the wheel.
    outDir: process.env.VERCEL ? "dist" : "../muscriptor/web_dist",
    emptyOutDir: true,
  },
});
