/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { poppins: ["Poppins", "serif"], rubik: ["Rubik", "serif"] },
      boxShadow: {
        custom: "0 10px 15px 0 rgba(255, 83, 48, 0.35)", // Define your custom shadow
        "custom-hovered": "0 10px 15px 0 rgba(255, 83, 48, 0.7)",
      },
    },
  },
  plugins: [],
};
