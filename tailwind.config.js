/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        base_lgt: "0 0 5px #c026d3",
        base_drk: "0 0 5px #6b21a8",
      },
      boxShadow: {
        fuchsia_light: "0 0 3px #f0abfc",
        fuchsia_medium: "0 0 6px #c026d3",
      },
    },
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  darkMode: "class",
  plugins: [nextui()],
  exports: {
    important: true,
  },
};
