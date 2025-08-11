module.exports = {
  content: ["./index.html", "./script.js"],
  theme: {
    extend: {
      colors: {
        'soft-purple': '#D8BFD8',
        'serene-blue': '#87CEEB',
        'pearl-white': '#F5F5F5',
        'pastel-pink': '#FFC1CC',
        'light-gold': '#FFD700',
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'display': ['Dancing Script', 'cursive'],
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}
