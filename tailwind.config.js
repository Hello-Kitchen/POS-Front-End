/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    colors: {
      'white': '#FFFFFF',
      'black': '#000000',
      'kitchen-blue': '#499CA6',
      'kitchen-yellow': '#F2E5A2',
      'kitchen-orange': '#F2762E',
      'kitchen-red': '#D91604',
      'kitchen-beige': '#D98282',
      'kitchen-food-detail': '#4958A6',
      'kitchen-food-detail-selected': '#FF9900',
      'kitchen-button-red': '#D91604',
      'kitchen-button-green': '#2FE900'
    },
    extend: {
      height: {
        'lh': '7%',
        'lf': '13%',
        'pos-button': '11%',
        '95': '95%',
        '1/12': '8.333333333%',
        '9/12': '75%'
      },
      width: {
        '1/10': '10%',
        '9/10': '90%',
      },
      fontSize: {
        '24px': '24px',
        '20px': '20px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

