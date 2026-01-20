/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-inter)"],
        serif: ["var(--font-playfair)"],
      },
      colors: {
                        primary: "#EF4444", // Vibrant Red
                        "background-light": "#FFFFFF",
                        "background-dark": "#0F172A",
                    },
                    borderRadius: {
                        DEFAULT: "0.5rem",
                        'large': '2rem',
                    },

    },
  },
  plugins: [],
};
