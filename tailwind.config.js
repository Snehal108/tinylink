// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}"
//   ],
//   theme: { extend: {} },
//   plugins: [],
// };



/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          500: "#375bf5",
          600: "#2f4fe0",
          700: "#2338b8",
        },
        purpleglow: {
          400: "#6f4eff",
          500: "#5b3aff"
        }
      },
      borderRadius: {
        'md-lg': '12px'
      },
      boxShadow: {
        'soft-lg': '0 10px 30px rgba(2,6,23,0.08)',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(.2,.9,.2,1)'
      }
    }
  },
  plugins: [],
};
