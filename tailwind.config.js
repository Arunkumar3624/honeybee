/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        honey: '#e59c1c',
        darkBrown: '#3a200e',
        cream: '#fcf8f2',
      }
    },
  },
  plugins: [],
}
