/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "green-cus": "#29ff29",
        "blue-cus": "#4054ff",
        "black-cus": "#030103",
        "white-cus": "#545254",
        "hover-cus": "#cf08c8",
      },
    },
  },
  plugins: [],
};
