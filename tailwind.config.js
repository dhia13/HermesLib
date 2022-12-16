const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto"', ...defaultTheme.fontFamily.sans],
        pressStart: ['"Press Start 2P"', "cursive"],
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        events: "url('../public/images/events.png')",
        healthier: "url('../public/images/healthier.png')",
        soon: "url('../public/images/soon.png')",
      },
      dropShadow: {
        glow: [
          "0 0 5px #03e9f4",
          "0 0 25px #03e9f4",
          "0 0 50px #03e9f4",
          "0 0 100px #03e9f4",
        ],
      },
    },
  },
  plugins: [],
};
