/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp';


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'radial-black': 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,1) 100%)',
        'bottom-fade': 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
      },
    },
  },
  plugins: [lineClamp],
}