import { fontFamily } from 'tailwindcss/defaultTheme'
import inter from 'tailwindcss-font-inter'

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // ✅ ini penting untuk dark mode berbasis class
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [inter()],
}
