/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./projects/web/src/**/*.{html, ts}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        darkChocolate: '#373333',
        pinkChocolate: '#D8ABAB',
        lightChocolate: '#A49A9A',
        darkGray: '#A49A9A',
        lightPink: '#F0DDDD'
      },
      spacing: {
        128: '92vw'
      }
    },
  },
  plugins: [],
}
