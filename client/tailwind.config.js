/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#171310',
        ivory: { DEFAULT: '#f7f3ec', 2: '#efe9df' },
        beige: '#e2d8c9',
        muted: '#7b6f64',
        accent: '#9a7b4f'
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: []
};
