/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        dance: {
          "0%":   { transform: "rotate(0deg) scale(1)" },
          "20%":  { transform: "rotate(-8deg) scale(1.05)" },
          "40%":  { transform: "rotate(8deg) scale(1.05)" },
          "60%":  { transform: "rotate(-6deg) scale(1.08)" },
          "80%":  { transform: "rotate(6deg) scale(1.05)" },
          "100%": { transform: "rotate(0deg) scale(1)" },
        },
      },
      animation: {
        dance: "dance 0.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}