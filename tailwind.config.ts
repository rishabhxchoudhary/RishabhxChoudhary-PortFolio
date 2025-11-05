import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#303340", // Deep Blue
          light: "#3B82F6", // Light Blue for hover states
          dark: "#303340", // Same as default for consistency
        },
        secondary: {
          DEFAULT: "#0066FF", // Vibrant Purple
          light: "#A78BFA", // Light Purple for hover
          dark: "#7C3AED", // Darker Purple for active states
          accent: "#14B8A6",
        },
        accent: {
          DEFAULT: "#14B8A6", // Soft Teal
          light: "#2DD4BF", // Light Teal for hover
          dark: "#0D9488", // Darker Teal for active
        },
        background: {
          DEFAULT: "#272935", // Very Dark Gray
          dark: "#303340", // Darker Gray for sections
        },
        text: {
          DEFAULT: "#f9f9fa", // Light Gray
          light: "#F3F4F6", // Lighter Gray for headings
          dark: "#f9f9fa", // Darker Gray for subtitles
        },
        // Additional Colors (Optional)
        highlight: "#FBBF24", // Amber for highlights
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      // Adding Custom Fonts (Optional)
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      // Custom Shadows (Optional)
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    plugin(function ({ addBase }) {
      addBase({
        ":root": {
          "--c-theme": "var(--ghost-accent-color)",
          "--logo-header-height": "40px",
          "--logo-footer-height": "40px",
          "--c-white": "#ffffff",
          "--c-black": "#000000",
          "--c-success": "#96EA8C",
          "--c-error": "#FF9B84",
          "--c-button-text": "var(--c-white)",
          "--size-1": "4px",
          "--size-2": "8px",
          "--size-3": "16px",
          "--size-4": "24px",
          "--c-body-bg": "#272935",
          "--c-text-main": "#f9f9fa",
          "--c-text-light": "#b2b2b3",
          "--c-gray-light": "#454854",
          "--c-gray-lighter": "#303340",
          "--c-border": "#35394b",
          "--c-border-light": "var(--c-gray-light)",
          "--c-shadow": "0 10px 10px rgba(0, 0, 0, 0.2)",
        },
      });
    }),
  ],
} satisfies Config;
