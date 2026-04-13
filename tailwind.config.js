/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#EDF1F5',
        },
        blue: {
          500: '#0145F2',
          600: '#0138c6',
        }
      }
    },
  },
  plugins: [],
}
