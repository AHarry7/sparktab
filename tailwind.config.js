/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"], // For headings
        sans: ["Poppins", "sans-serif"], // For body text
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
