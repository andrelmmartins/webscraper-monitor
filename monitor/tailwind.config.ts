import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1440px",
      },
    },
    screens: {
      micro: "360px",
      mobile: "480px",
      tablet: "767px",
      laptop: "991px",
      desktop: "1280px",
      monitor: "1440px",
      ultra: "1800px",
    },
    colors: {
      white: "#F2F0EB",
      black: "#0D0D0D",
      red: "#F23B3B",
      gray: {
        DEFAULT: "#DBD9D5",
        light: "#C4C3BF",
        medium: {
          DEFAULT: "#969592",
          dark: "#696866",
        },
        darker: "#3B3A39",
      },
    },
  },
  plugins: [],
};
export default config;
