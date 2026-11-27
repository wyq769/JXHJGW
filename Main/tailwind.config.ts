import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#12507F",
          dark: "#0B3557",
          light: "#1E6FA8",
          tint: "#EEF4FA",
        },
        accent: { DEFAULT: "#D6282C", dark: "#B31F23", tint: "#FBEDED" },
        ink: { DEFAULT: "#111827", 2: "#5B6672", 3: "#8A939C" },
        line: "#E3E8EF",
        soft: "#F4F7FA",
      },
      maxWidth: { site: "1200px" },
      fontFamily: {
        sans: ['"PingFang SC"', '"Microsoft YaHei"', '"Noto Sans SC"', "system-ui", "sans-serif"],
        num: ['"DIN Alternate"', '"Bahnschrift"', '"Oswald"', "system-ui", "sans-serif"],
      },
      borderRadius: { xs: "4px" },
    },
  },
  plugins: [],
};
export default config;