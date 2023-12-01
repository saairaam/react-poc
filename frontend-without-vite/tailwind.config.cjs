/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {},
    },
    fontFamily: {
      cinzel: ['Cinzel', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif '],
      Roboto: ['Roboto', 'sans-serif'],
    },
  },
  plugins: [require('tailwind-scrollbar'), require('daisyui')],
};
