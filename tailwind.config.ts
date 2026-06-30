import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f7f1e7",
        ink: "#241f1a",
        clay: "#b56f43",
        moss: "#65745f",
        linen: "#fffaf1"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(55, 42, 28, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
