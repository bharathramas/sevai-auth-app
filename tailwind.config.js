/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './index.css',
    './layout.tsx',
  ],
  safelist: [
    'bg-black', 'text-white', 'text-blue-500', 'text-gray-300', 'text-black',
    'bg-white', 'hover:bg-gray-200', 'inline-block', 'text-center', 'rounded-full',
    'shadow', 'px-5', 'py-3', 'px-4', 'py-2', 'text-sm', 'text-lg', 'text-xl',
    'text-4xl', 'sm:text-6xl', 'font-extrabold', 'font-semibold', 'mb-6', 'mb-8',
    'tracking-tight', 'leading-tight', 'transition'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
