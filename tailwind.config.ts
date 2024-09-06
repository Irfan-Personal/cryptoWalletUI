import type { Config } from 'tailwindcss';

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        cardBorder: '#C0C7D0',
        cardSurface: '#EBEDF0',
        headingText: '#0D1821',
        primary: '#344966',
        white: '#fff',
        borderColor: '#C0C7D0',
        error: '#ff0000',
        unfocusedTabColor: '#909599',
        textUnfocused: '#5D646A',
        positive: '#32C359',
        lightBlue: '#EBEDF0',
        backLayColor: '#0D1821B2',
        successIllustration: '#3D464D',
        errorText: '#DA3126',
        disabledButton: '##7676801F',
        disabledText: '#3C3C434D',
      },
      height: {
        addressTextInput: '56px',
      },
      fontSize: {
        virtualKeyboard: '25px',
      },
      borderRadius: {
        cardRadius: '10px',
      },
    },
  },
  plugins: [],
} satisfies Config;
