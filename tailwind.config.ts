import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "hsl(210, 30%, 95%)",
        accent: "hsl(255, 90%, 50%)",
        primary: "hsl(210, 90%, 30%)",
        surface: "hsl(210, 30%, 100%)",
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "4px",
      },
      spacing: {
        lg: "16px",
        md: "12px",
        sm: "8px",
      },
      boxShadow: {
        card: "0 4px 12px hsla(210, 30%, 0%, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
