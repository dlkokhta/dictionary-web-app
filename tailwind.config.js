/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },

  theme: {
    fontFamily: {
      Inconsolata: ["monospace"],
      Inter: ["sans-serif"],
      Lora: ["monospace"],

      // spartan: ["Spartan", "sans-serif"],
    },
    screens: {
      sm: "378px",
      // => @media (min-width: 640px) { ... }

      md: "765px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1440px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },

  plugins: [],
};
