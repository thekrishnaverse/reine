
// This file is mostly for intellisense and local development setup.
// The actual Tailwind configuration for this project is done via the <script> in index.html for CDN usage.
module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'honda-red': '#E4002B',
        'honda-gray': {
          DEFAULT: '#333333',
          light: '#F0F0F0',
          dark: '#1C1C1C',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
