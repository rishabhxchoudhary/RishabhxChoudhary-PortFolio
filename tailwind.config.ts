import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

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
          DEFAULT: '#1E3A8A', // Deep Blue
          light: '#3B82F6',    // Light Blue for hover states
          dark: '#1E3A8A',     // Same as default for consistency
        },
        secondary: {
          DEFAULT: '#8B5CF6', // Vibrant Purple
          light: '#A78BFA',    // Light Purple for hover
          dark: '#7C3AED',     // Darker Purple for active states
        },
        accent: {
          DEFAULT: '#14B8A6', // Soft Teal
          light: '#2DD4BF',    // Light Teal for hover
          dark: '#0D9488',     // Darker Teal for active
        },
        background: {
          DEFAULT: '#111827', // Very Dark Gray
          dark: '#1F2937',    // Darker Gray for sections
        },
        text: {
          DEFAULT: '#D1D5DB', // Light Gray
          light: '#F3F4F6',    // Lighter Gray for headings
          dark: '#9CA3AF',     // Darker Gray for subtitles
        },
        // Additional Colors (Optional)
        highlight: '#FBBF24', // Amber for highlights
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      // Adding Custom Fonts (Optional)
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // Custom Shadows (Optional)
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
