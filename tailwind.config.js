/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        handwriting: ['Dancing Script', 'cursive'],
        elegant: ['Kaushan Script', 'cursive'],
      },
      colors: {
        paper: {
          50: '#fefcf8',
          100: '#fdf9f3',
          200: '#faf5eb',
          300: '#f5ede0',
          400: '#ede0c9',
          500: '#e2d0a3',
        }
      },
      animation: {
        typewriter: 'typewriter 3s steps(50) 1s forwards',
        blink: 'blink 1s infinite',
        confetti: 'confetti 3s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' }
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' }
        },
        confetti: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
}