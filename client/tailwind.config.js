// const flowbite = require('flowbite-react/tailwind')
import flowbite  from 'flowbite-react/tailwind'
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Indigo
        secondary: '#EC4899', // Pink
        accent: '#10B981', // Green
      },
    },
  },
  daisyui: {
    themes: ['light', 'dark', 'cupcake'],
  },
  plugins: [flowbite.plugin(), require('daisyui')],
}
