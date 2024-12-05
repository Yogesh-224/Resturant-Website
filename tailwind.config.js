/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        'spin-slow':'spin 1s linear 1',
      },
      colors:{
        'button-clr': 'rgb(12 99 220)',
      },height: {
        '36': '9rem',  // 9rem = 144px
      },
     
    },
  },
  plugins: [],
}

