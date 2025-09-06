/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
     keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slowPulse: {
          "0%, 100%": { opacity: 1, filter: "drop-shadow(0 0 25px #ff00ff)" },
          "50%": { opacity: 0.7, filter: "drop-shadow(0 0 15px #ff00ff)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 2s ease-out forwards",
        "slow-pulse": "slowPulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

