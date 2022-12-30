/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#FFD201",

          "secondary": "#696CFF",

          "accent": "#09B39E",

          "neutral": "#00171F",

          "base-100": "#F3F5F7",

          "info": "#ACC8E7",

          "success": "#04342C",

          "warning": "#E27E03",

          "error": "#F03D5E",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}