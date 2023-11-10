/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        searchbg: "url('./src/assets/images/movies.jpg')",
        homebg: "url('./src/assets/images/background.jpg')",
      },
    },
    fontFamily: {
      cinzel: ["Cinzel", "sans-serif"],
      poppins: ["Poppins", "sans-serif "],
      Roboto: ["Roboto", "sans-serif"],
    },
  },
  plugins: [require("tailwind-scrollbar"), require("daisyui")],
};
