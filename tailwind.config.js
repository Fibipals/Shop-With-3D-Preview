/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {},
  },
  plugins: [function({ addUtilities }) {
    const newUtilities = {
      '.bg-gradient': {
        '@apply bg-gradient-to-br from-rose-400 to-fuchsia-700': {},
      },
    };
    addUtilities(newUtilities, ['responsive', 'hover']);
  },],
}

