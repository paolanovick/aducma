/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        verde: {
          DEFAULT: '#318223',
          light: '#4a9e3a',
          dark: '#256619',
        },
        dorado: {
          DEFAULT: '#765912',
          light: '#9a7a2a',
          dark: '#5a440e',
        },
        crema: {
          DEFAULT: '#ebe7df',
          light: '#f5f3ed',
          dark: '#d9d4c8',
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}