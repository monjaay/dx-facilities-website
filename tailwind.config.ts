import type { Config } from "tailwindcss";

// Tailwind v4 note: theme tokens are defined in src/app/globals.css via @theme.
// This file documents the token structure for reference.
// See docs/DESIGN_SYSTEM.md for the full design system specification.

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
};

export default config;
