import { fontFamily } from 'tailwindcss/defaultTheme'
import inter from 'tailwindcss-font-inter'

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // sesuaikan dengan struktur proyek kamu
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [inter()],
}
