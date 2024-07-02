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
    },
    extend: {
      height: {
        'lh': '7%',
        'lf': '13%',
        'pos-button': '11%',
        'current-cmd-content': '77%',
        'current-cmd-footer': '15%',
        'current-cmd-header': '8%',
        'ls': '20%',
        'lb': '80%',
      },
      width: {
        '1/10': '10%',
        '9/10': '90%',
      },
      fontSize: {
        '24px': '24px',
        '20px': '20px',
        'testpx': '28px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

