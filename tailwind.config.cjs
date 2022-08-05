/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        a4: "297mm",
      },
      width: {
        a4: "210mm",
      },
    },
  },
  plugins: [require('@tailwindcss/forms'),],
};
