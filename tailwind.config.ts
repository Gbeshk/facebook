import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        bg: "1015px",
      },
      colors: {
        "gray-100": "var(--bg-primary)",
        "gray-200": "var(--gray-200)",
        "gray-300": "var(--gray-300)",
        white: "var(--bg-secondary)",

        black: "var(--text-primary)",
        "gray-800": "var(--text-primary)",
        "gray-500": "var(--text-secondary)",
        "[#65686c]": "var(--text-secondary)",
        "[#65676b]": "var(--text-secondary)",
      },
      backgroundColor: {
        "[#f0f2f5]": "var(--bg-primary)",
      },
      filter: {
        "icon-filter": "var(--icon-filter)",
      },
    },
  },
  plugins: [],
};
export default config;
