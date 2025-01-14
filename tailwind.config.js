/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}","./js/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        primary : "#006bff"
      }
    },
  },
  plugins: [],
}