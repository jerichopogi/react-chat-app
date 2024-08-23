// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Light blue color
        secondary: '#1D4ED8', // Darker blue for accents
        neutral: '#F3F4F6', // Light gray for backgrounds
        accent: '#D1D5DB', // Gray for borders and accents
      },
    },
  },
  plugins: [],
}
