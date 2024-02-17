/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs', // Adjust the path to match your EJS files
    './public/**/*.html', // Adjust the path to match your HTML files
  ],
  options: {
    safelist: ['fas', 'fa-calculator'] // Add the Font Awesome classes you're using
  },
  theme: {
    extend: {},
    
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    }
  },
  plugins: [],
}

