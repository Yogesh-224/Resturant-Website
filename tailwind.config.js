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
      animation: {
        colorChange: 'colorChange 3s ease-in-out infinite',
    },
    keyframes: {
        colorChange: {
            '0%': { backgroundColor: '#b02004' }, /* red-500 */
            '50%': { backgroundColor: '#874f41' }, /* yellow-500 */
            '100%': { backgroundColor: '#6e2716' }, /* red-500 */
        },
    },
    },
  },
  plugins: [],
} 

