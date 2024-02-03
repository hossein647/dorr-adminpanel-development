const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        "xs": '460px',
        ...defaultTheme.screens
      }
    },
  },
  plugins: [],
}