/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  darkMode: 'media',
  theme: {
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      video: '16 / 9',
      wide: '3 / 1',
      insta: '4 / 5',
      '4/3': '4 / 3',
      '3/2': '3 / 2',
    },
    extend: {
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      dropShadow: {
        DEFAULT: '0 0px 0px rgba(0,0,0,0)',
        lg: '0 2px 32px theme("colors.softnight[300]")',
      },
    },
    colors: {
      // // Using modern `rgb`
      // primary: 'rgb(var(--color-primary) / <alpha-value>)',
      // secondary: 'rgb(var(--color-secondary) / <alpha-value>)',

      // // Using modern `hsl`
      // primary: 'hsl(var(--color-primary) / <alpha-value>)',
      // secondary: 'hsl(var(--color-secondary) / <alpha-value>)',

      // // Using legacy `rgba`
      // primary: 'rgba(var(--color-primary), <alpha-value>)',
      // secondary: 'rgba(var(--color-secondary), <alpha-value>)',

      // #393E41, #D3D0CB, #E7E5DF, #44BBA4, #E7BB41

      primary: '#463290', //'#463290', //<->361E90
      primaryHover: '#573EB1',
      primaryDarkMode: '#C6BCE8',
      primaryMedium: '#8C79D0',
      complementary: '#7B8F32', //<->77901D
      complementaryDarkMode: '#7B8F32', //<->77901D
      secondary: '#f3f5f7',
      secondaryDarkMode: '#DDE8BB',
      marker: '#f3f5f7',
      zebraEven: '#fff',
      zebraOdd: '#f3f5f7',
      markerHover: '#DEE3E9',
      markerDarkMode: '#2A343F',
      contrast: '#F1EEF9',
      white: '#fff',
      header: '#fff',
      headerContrast: '#fff',
      footer: '#fff',
      footerContrast: '#1C232A',
      dark: '#1C232A',
      black: '#000',

      softnight: {
        50: '#7864c2',
        100: '#6e5ab8',
        200: '#6450ae',
        300: '#5a46a4',
        400: '#503c9a',
        500: '#463290',
        600: '#3c2886',
        700: '#321e7c',
        800: '#281472',
        900: '#1e0a68',
      },
      softspring: {
        50: '#adc164',
        100: '#a3b75a',
        200: '#99ad50',
        300: '#8fa346',
        400: '#85993c',
        500: '#7b8f32',
        600: '#718528',
        700: '#677b1e',
        800: '#5d7114',
        900: '#53670a',
      },
      silvernight: {
        50: '#F3F5F7',
        100: '#DEE3E9',
        200: '#C9D2DB',
        300: '#B4C0CD',
        400: '#9FAFBF',
        500: '#8A9DB1',
        600: '#758CA3',
        700: '#dfe1e3',
        800: '#384654',
        900: '#1C232A',
      },
      softlight: {
        50: '#f8eeff',
        100: '#eee4ff',
        200: '#e4daff',
        300: '#dad0fc',
        400: '#d0c6f2',
        500: '#c6bce8',
        600: '#bcb2de',
        700: '#b2a8d4',
        800: '#a89eca',
        900: '#9e94c0',
      },
      silverlight: {
        50: '#ffffed',
        100: '#ffffe3',
        200: '#fbffd9',
        300: '#f1fccf',
        400: '#e7f2c5',
        500: '#dde8bb',
        600: '#d3deb1',
        700: '#c9d4a7',
        800: '#bfca9d',
        900: '#b5c093',
      },
    },
    fontFamily: {
      body: ['Arial', 'Helvetica', '_sans'],
    },
    fontWeight: {
      light: [300],
      default: [400],
      medium: [500],
      bold: [700],
    },
    fontSizes: {
      DEFAULT: '1rem',
      caption: '0.85rem',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ matchUtilities, addComponents, theme }) {
      matchUtilities({
        'text-shadow': (value) => ({
          textShadow: value,
        }),
        'max-width': (value) => ({
          maxWidth: value,
        }),
      }),
        addComponents({
          '.bg-transparent': {
            backgroundColor: 'transparent',
          },
          '.btn': {
            cursor: 'pointer',
            borderRadius: '.5rem',
            fontWeight: '300',
            letterSpacing: '0.022em',
            padding: '.5rem 1rem',
          },
          '.btn-icon': {
            borderRadius: '4rem',
            padding: '1rem',
            height: '4rem',
            width: '4rem',
            '&:hover': {
              backgroundColor: theme('colors.silvernight[50]'),
              color: theme('colors.primary'),
            },
            '&.btn-primary:hover': {
              color: theme('colors.silvernight[50]'),
            },
            a: {
              color: theme('colors.primary'),
              '&:hover': {
                color: theme('colors.primaryMedium'),
              },
            },
          },
          '.a-primary, .btn-primary': {
            backgroundColor: theme('colors.primary'),
            color: theme('colors.contrast'),
            '&:hover': {
              backgroundColor: theme('colors.primaryHover'),
            },
          },
          '.btn-white': {
            backgroundColor: theme('colors.white'),
            '&:hover': {
              backgroundColor: theme('colors.marker'),
            },
          },
          '.btn-secondary': {
            backgroundColor: theme('colors.contrast'),
            color: theme('colors.markerDarkMode'),
            '&:hover': {
              backgroundColor: theme('colors.silvernight[200]'),
            },
          },
          '.elevated': {
            boxShadow: '0 2px 32px rgba(0,0,0,0.5)',
          },
          '.elevated-medium': {
            boxShadow: '0 2px 32px rgba(0,0,0,0.25)',
          },
          '.elevated-light': {
            boxShadow: '0 2px 32px rgba(0,0,0,0.15)',
          },
          '.vignette': {
            boxShadow: '0 0 100vw rgba(0,0,0,0.25) inset',
          },
          '.css-transition-nav': {
            transitionProperty: 'transform',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          },
          '.skeleton': {
            cursor: 'progress',
            background:
              "linear-gradient(120deg, theme('colors.marker') 30%, theme('colors.white') 55%, theme('colors.marker') 66%)",
            backgroundSize: '250% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '100% 0',
            animation: 'loading 2s infinite',
          },
        });
    }),
  ],
};
