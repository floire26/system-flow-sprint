/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    fontFamily: {
      'display': ['Oswald', 'serif'],
      'items': ['Questrial', 'sans-serif'],
      'buttons': ['Cabin', 'sans-serif']
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('flowbite/plugin'),
    require("daisyui"),
  ],
}
