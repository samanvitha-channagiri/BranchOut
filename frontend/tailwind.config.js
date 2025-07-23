/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // watches all React files
  ],
  theme: {
    extend: {
      colors:{
        'midgreen':'#588157',
        'darkgreen':'#3A5A40',
        'lightgreen':'#A3B18A'
      },
      fontFamily: {
            'dancing-script': ['Dancing Script', 'cursive'],
          }
    },
  },
  plugins: [],
}
