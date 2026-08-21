/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alt: {
          50: '#f0f5fa',
          100: '#e1ecf5',
          200: '#c3d9eb',
          300: '#94bcdd',
          400: '#5e9bcc',
          500: '#387eb7',
          600: '#276498',
          700: '#20507c',
          800: '#1d4467',
          900: '#1c3a55',
          950: '#112538',
        },
        navy: {
          850: '#131e32',
          900: '#0c1527',
          950: '#070c18',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
