/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#006933",
        secondary: "#00274C",
        // secondary: "#00274C",
        blue: "#0F60FF",
        disabled: "#F2F2F2",
        btnGray: "#8996A2",
        "main-gray": "#F0F2F5",
        "border-color": "#D9DDE1",
        "main-black": "rgba(34, 40, 49, 1)",
        "input-border": "rgba(227, 227, 227, 1)",
        "input-focus": "rgba(26, 164, 255, 1)",
        "input-succes": "rgba(29, 173, 69, 1)",
        "input-error": "rgba(246, 7, 42, 1)",
        skleton: "#E0E0E0",
        "input-error": "#F42C2C",
        warning: "#FFA800",
        orange: "#FFA500",
        violate: "#6D28D9",
        carrot: "#FF6B35",
        red: "#F42C2C",
        "sky-blue": "#1AA4FF",
        "emerald-green": "#27AE60",
        nephritis: "#27AE60",
        "mix-blue": "#CFD9FE",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      screens: {
        mobile_340: "340px",
      },
    },
  },
  plugins: [],
};
