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
        base: "0 0 10px ##fb7185",
      },
      boxShadow: {
        fuchsia_light: "0 0 3px #f0abfc",
        fuchsia_medium: "0 0 6px #c026d3",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
  exports: {
    important: true,
  },
};
