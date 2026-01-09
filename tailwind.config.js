module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        glitch1: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        glitch2: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(2px, -2px)" },
          "40%": { transform: "translate(2px, 2px)" },
          "60%": { transform: "translate(-2px, -2px)" },
          "80%": { transform: "translate(-2px, 2px)" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "glitch-1": "glitch1 0.25s infinite",
        "glitch-2": "glitch2 0.3s infinite",
        gradient: "gradient 6s ease infinite",
      },
    },
  },
  plugins: [],
};
