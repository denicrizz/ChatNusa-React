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
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulse: {
          '0%': {
            transform: 'scale(1)',
            'box-shadow': '0 0 0 rgba(59, 130, 246, 0.7)',
          },
          '50%': {
            transform: 'scale(1.05)',
            'box-shadow': '0 0 0 rgba(59, 130, 246, 0)',
          },
          '100%': {
            transform: 'scale(1)',
            'box-shadow': '0 0 0 rgba(59, 130, 246, 0.7)',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'grid-pattern': `radial-gradient(circle, #3B82F6 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid-pattern': '40px 40px',
      },
    },
  },
  plugins: [inter()],
}
