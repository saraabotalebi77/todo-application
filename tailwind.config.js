/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "light-purple" : "#7556cd",
        "white" : "#fff",
      },
    },
    fontFamily :{
      "Roboto" : ["Roboto"],
    },
    fontWeight : {
      small : 300,
      normal : 400,
      medium : 500,
      bold : 700,
    }
    
  },
  plugins: [],
}