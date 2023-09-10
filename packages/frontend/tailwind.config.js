/** @type {import('tailwindcss').Config} */
const themes = require('./themes')
module.exports = {
  content: [
    // Daisy UI
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
    // in monorepo parent workspace
    '../../node_modules/daisyui/dist/**/*.js',
    '../../node_modules/react-daisyui/dist/**/*.js',

    // App Components
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes
  },
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              'text-decoration': 'underline',
              '&:hover': {
                color: 'hsl(var(--p))',
              },
              '&:active': {
                color: 'hsl(var(--pf))',
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require('daisyui')],
}


