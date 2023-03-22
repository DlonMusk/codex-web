/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        main: ['PT Serif', 'serif'],
      },
      colors: {
        offwhite: '#D3CFC2'
      },
      height: {
        'screen-ios': '-webkit-fill-available',
      },
    },
  },
  plugins: [],
}