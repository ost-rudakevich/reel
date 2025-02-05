/** @type {import('tailwindcss').Config} */

const colors = {
  primary: '#B61C1C',
  black: '#000000',
  white: '#FFFFFF',
  'white-gray': '#f2f3f5',
  'main-gray': '#100f12',
  gray: {
    300: '#252525',
    500: '#999AA5',
    600: '#66676E',
    700: '#38373A',
    800: '#232323',
    900: '#100f12',
    950: '#999999'
  }
}

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors,
      keyframes: {
        fade: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        scaleIn: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.9)'
          },
          '50%': {
            opacity: 0.3
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)'
          }
        }
      },
      fontFamily: {
        Roboto: ['Roboto']
      },
      animation: {
        fade: 'fade .5s ease-in-out',
        scaleIn: 'scaleIn .35s ease-in-out'
      }
    }
  },
  plugins: []
}
