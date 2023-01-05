/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#222222",

          "secondary": "#2B1F2B",

          "accent": "#ffffff",

          "neutral": "#F97F40",

          "base-100": "#FAF9F6",

          "info": "#ACC8E7",

          "success": "#04342C",

          "warning": "#E27E03",

          "error": "#F03D5E",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require('tailwind-scrollbar-hide')],
}