const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        "xs": '400px',
        ...defaultTheme.screens
      }
    },
  },
  plugins: [],
}