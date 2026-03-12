/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors'
import tailwindForms from '@tailwindcss/forms'

export default {
  content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}',
      './formkit.config.js',
      './node_modules/vue-tailwind-datepicker/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
        colors: {
          'vtd-primary': colors.teal
        }
    },
  },
  plugins: [
      tailwindForms
  ],
}

