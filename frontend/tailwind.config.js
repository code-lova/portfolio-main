/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'heading-color': "#c4cfde",
        'primary': "#ECEEFF",
        "coral-red": "#d4374c",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)"
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'shadow-1': '10px 10px 19px #1c1e22, -10px -10px 19px #262a2e',
        'shadow-2': 'inset 21px 21px 19px #181a1d, inset -21px -21px 19px #202225',
        'inner-shadow': '1px 4px 2px -3px rgba(0, 0, 0, 0.7) inset, -1px -3px 3px -2px rgba(255, 255, 255, 0.2) inset',
        'shadow-white-3': '5px 5px 15px #D1D9E6, -5px -5px 15px #ffffff',
        'gradient-box-w': 'linear-gradient(145deg, #e2e8ec, #ffffff)',
        'gradient-red-hover': 'linear-gradient(145deg, #ff014f, #d11414)',
      },
      backgroundImage: {
        'hero': "url('assets/images/banner.webp')",
        'card': "url('assets/images/thumbnail-background.svg')",
      },
      screens: {
        "wide": "1440px"
      }
    },
  },
  plugins: [],
}

