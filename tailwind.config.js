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
      'kitchen-button-green': '#2FE900',
      'kitchen-button-orange': '#FF9900',
      'category-red': '#D91604',
      'category-purple': '#C442C7',
      'category-orange': '#FF9900',
      'category-green': '#62B73A',
      'category-blue': '#4958A6',
      'category-cyan': '#2FAFCB',
      'category-all': '#D91604',
      'grey-bg': '#D9D9D9',
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
        '1/20': '5%',
      },
      fontSize: {
        '24px': '24px',
        '20px': '20px',
      },
      gridTemplateColumns: {
        '48': 'repeat(48, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-36': 'span 36 / span 36',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

