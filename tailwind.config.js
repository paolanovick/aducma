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
    },
  },
  plugins: [],
}