/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '520px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // primary: "#FCAF3C",
        // secondary: "#fff"
        primary: "#0A174E",
        secondary: "#F5D042"
      }
    },
  },
  plugins: [],
}