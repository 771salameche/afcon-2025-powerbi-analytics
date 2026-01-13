/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode based on 'dark' class in html
  theme: {
    extend: {
      screens: {
        'xs': { 'max': '375px' },
      },
      colors: {
        'primary-maroon': '#800000',
        'primary-teal': '#07A88F',
        'secondary-white': '#FFFFFF',
        'secondary-red': '#B2382D',
        'secondary-dark-teal': '#006051',
        'secondary-gold': '#FDB913',
      },
      fontFamily: {
        title: ['"Dunbar Low"', 'serif'],
        body: ['"Dunbar Text"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}