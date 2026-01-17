/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        urban: {
          black: '#050505',
          white: '#FAFAFA',
          red: '#FF2A00', 
          gray: '#1A1A1A',
          'light-gray': '#F0F0F0'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
}