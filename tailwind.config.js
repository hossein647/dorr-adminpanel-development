/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        "xs": '360px',
        ...this.theme.screens
      }
    },
  },
  plugins: [],
}