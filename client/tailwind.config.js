// const flowbite = require('flowbite-react/tailwind')
import flowbite  from 'flowbite-react/tailwind'
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['light', 'dark', 'cupcake'],
  },
  plugins: [flowbite.plugin(), require('daisyui')],
}
