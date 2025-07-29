/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8e7',
          100: '#f9ecbb',
          200: '#f4dc8f',
          300: '#eecb63',
          400: '#e7ba37',
          500: '#90761F', // Base color
          600: '#816a1c', // Darker for hover
          700: '#725e19',
          800: '#635216',
          900: '#544613',
          950: '#453a10',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}