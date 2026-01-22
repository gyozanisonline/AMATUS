/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amatus: {
          red: '#d9393f',
          white: '#ffffff',
        }
      }
    },
  },
  plugins: [],
}
