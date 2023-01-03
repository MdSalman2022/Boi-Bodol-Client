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

          "secondary": "#ffffff",

          "accent": "#09B39E",

          "neutral": "#000000",

          "base-100": "#f4f4f4",

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