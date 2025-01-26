/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        pisca: {
          '0%': {
            opacity: '0.1'
          },
          '50%': {
            opacity: '1'
          },
          '100%': {
            opacity: '0.2'
          }
        }
      },
      animation: {
        pisca: "pisca 1s ease infinite"
      },
    },
  },
  plugins: [],
}

