import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Vercel serves dist/404.html, with a real 404 status, for any URL that isn't a known page
 * (see the rewrites in vercel.json). It's a copy of the app shell, so the router shows the
 * site's own "page not found" screen.
 */
const notFoundPage = () => ({
  name: "spa-404-page",
  apply: "build",
  closeBundle() {
    const dist = resolve(__dirname, "dist");
    copyFileSync(resolve(dist, "index.html"), resolve(dist, "404.html"));
  },
});

export default defineConfig({
  plugins: [react(), notFoundPage()], // react(): automatic JSX runtime
});
