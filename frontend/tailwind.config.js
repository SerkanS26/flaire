/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#ed3849",
        // "primary-dark": "#d23141",
        // "primary-light": "#f4e5ec",
        primary: "#DAA520",
        "primary-dark": "#AA6C39",
        "primary-light": "#F1E5AC",
        "text-dark": "#0f172a",
        "text-light": "#64748b",
        "extra-light": "#f8fafc",
      },
      maxWidth: {
        "screen-2xl": "1400px",
        "custom-1200": "1200px",
        "custom-900": "900px",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      gridTemplateColumns: {
        "70/30": "70% 28%",
      },
    },
  },
  plugins: [],
};
