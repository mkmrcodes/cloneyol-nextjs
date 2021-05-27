const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ['Source\\ Sans\\ Pro', 'sans-serif'],
      display: ['Oxygen', 'sans-serif'],
    },
    extend: {
      fontSize: {
        xxs: '0.6rem',
      },
      width: {
        thead: 'calc(100% - 17px)',
      },
      colors: {
        primary: '#F27A1A',
        muted: '#747474',
        smoke: 'rgba(0,0,0,0.4)',
      },
      transitionProperty: {
        maxHeight: 'max-height',
      },
      height: {
        350: '350px',
      },
      maxHeight: {
        350: '350px',
      },
      backgroundImage: (theme) => ({
        'empty-star': "url('/images/empty-star.svg')",
        'full-star': "url('/images/full-star.svg')",
        'empty-border-star': "url('/images/empty-border-star.svg')",
      }),
    },
  },
  variants: {
    extend: {
      outline: ['hover', 'active'],
      backgroundColor: ['checked'],
      backgroundColor: ['checked:focus'],
      backgroundColor: ['checked:hover'],
      backgroundColor: ['label-checked'],
      borderColor: ['label-checked'],
      backgroundColor: ['label-cb-checked'],
      borderColor: ['label-cb-checked'],
      maxHeight: ['group-hover'],
      borderWidth: ['group-hover'],
      transform: ['hover'],
      textColor: ['disabled'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    plugin(({ addVariant, e }) => {
      addVariant('label-checked', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          const eClassName = e(`label-checked${separator}${className}`); // escape class
          const yourSelector = 'input[type="radio"]'; // your input selector. Could be any
          return `${yourSelector}:checked ~ .${eClassName}`; // ~ - CSS selector for siblings
        });
      });
    }),
    plugin(({ addVariant, e }) => {
      addVariant('label-cb-checked', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          const eClassName = e(`label-cb-checked${separator}${className}`); // escape class
          const yourSelector = 'input[type="checkbox"]'; // your input selector. Could be any
          return `${yourSelector}:checked ~ .${eClassName}`; // ~ - CSS selector for siblings
        });
      });
    }),
  ],
};
