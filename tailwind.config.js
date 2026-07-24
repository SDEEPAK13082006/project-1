/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dream: {
          night: '#0E1A40',
          purple: '#8A5CF6',
          sky: '#7FD9FF',
          pink: '#FFB4E8',
          cream: '#FFF7E8',
          gold: '#FFD95E',
          white: '#FFFFFF',
          darkCard: '#152454',
          deep: '#09102A'
        }
      },
      fontFamily: {
        fredoka: ['Fredoka', 'sans-serif'],
        baloo: ['Baloo 2', 'cursive', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        sans: ['Fredoka', 'Nunito', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glass-magic': '0 12px 40px 0 rgba(138, 92, 246, 0.25)',
        'glow-gold': '0 0 30px 2px rgba(255, 217, 94, 0.6)',
        'glow-purple': '0 0 30px 2px rgba(138, 92, 246, 0.6)',
        'glow-sky': '0 0 30px 2px rgba(127, 217, 255, 0.6)',
        'glow-pink': '0 0 30px 2px rgba(255, 180, 232, 0.6)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(3deg)' },
        },
        firefly: {
          '0%, 100%': { opacity: '0.2', transform: 'translate(0, 0) scale(0.8)' },
          '50%': { opacity: '1', transform: 'translate(15px, -20px) scale(1.3)' },
        },
        driftCloud: {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(110%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        firefly: 'firefly 4s ease-in-out infinite',
        drift: 'driftCloud 45s linear infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
