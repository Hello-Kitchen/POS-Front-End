/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      inset: {
        'food-top': '20.333%',
        '1/5': '20%',
        '2/5': '40%'
      },
      height: {
        'food-top': '20.333%',
        'lh': '7%',
        'lf': '13%',
        'pos-button': '11%',
        'current-cmd-content': '92%',
        'current-cmd-footer': '15%',
        'current-cmd-header': '8%',
        'ls': '20%',
        'lb': '80%',
        '85': '85%',
        '1/12': '8.333333333%',
        '9/12': '75%'
      },
      width: {
        '1/10': '10%',
        '9/10': '90%',
        '1/20': '5%',
      },
      fontSize: {
        '16px': '16px',
        '24px': '24px',
        '20px': '20px',
        'testpx': '28px'
      },
      gridTemplateColumns: {
        '48': 'repeat(48, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-36': 'span 36 / span 36',
      },
      boxShadow: {
        'inner-top-lg': 'inset 0 5px 5px rgba(0, 0, 0, 0.3)',
        'inner-right-lg': 'inset -5px 0 5px rgba(0, 0, 0, 0.3)',
        "button": "inset 0 10px 20px -20px rgba(0,0,0,1)",
      },
      colors: {
        'white': '#FFFFFF',
        'black': '#000000',
        'kitchen-blue': '#499CA6',
        'kitchen-yellow': '#F2E5A2',
        'kitchen-orange': '#F2762E',
        'kitchen-red': '#D91604',
        'kitchen-beige': '#D98282',
        'kitchen-green': '#8DED74',
        'kitchen-food-detail': '#4958A6',
        'kitchen-food-detail-selected': '#FF9900',
        'kitchen-food-ingredient-green': '#2FE900',
        'kitchen-food-ingredient-red': '#FF0000',
        'kitchen-food-ingredient-green-selected': '#CAF2C0',
        'kitchen-food-ingredient-red-selected': '#F5AFAF',
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
    },
  },
  /**
  * Safelist is used to force the colors to be in the final css file to be used in dynamic classes
  */
  safelist: [
    'text-kitchen-green',
    'text-kitchen-red',
    'text-kitchen-blue',
    'bg-kitchen-green',
    'bg-kitchen-red',
    'bg-kitchen-blue',
    'bg-kitchen-food-ingredient-green',
    'bg-kitchen-food-ingredient-red',
    'bg-kitchen-food-ingredient-green-selected',
    'bg-kitchen-food-ingredient-red-selected',
  ],
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
