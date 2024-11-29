const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      fontFamily: {
        paladins: ["Paladins", "sans-serif"],
        paladinsgrad: ["PaladinsGrad", "sans-serif"],
      },
      colors: {
        'belouga-blue': '#98c9f3',
        'belouga-grey': '#2e2f35',
        'belouga-lightGrey': '#c6c6d3',
        'belouga-dark': '#1e1e1e'
      }
    },
  },
  plugins: [
    flowbite.plugin()
  ],
};

