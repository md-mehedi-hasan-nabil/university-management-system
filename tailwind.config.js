/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        xRotate: 'xRotate 0.5s ease infinite',
        zoomIn: 'zoomIn 0.5s ease',
        zoomInOut: 'zoomInOut 0.5s ease',
      },
      keyframes: {
        xRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(1deg)' },
          '25%': { transform: 'rotate(0deg)' },
          '75%': { transform: 'rotate(-1deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        zoomIn: {
          '0%': { transform: ' scale(1.3)', opacity: 0 },
          '100%': { transform: ' scale(1)', opacity: 1 },
        },
        zoomInOut: {
          '0%': {
            transform: 'translate(-50%, -50%) scale(1)',
          },
          '25%': {
            transform: 'translate(-50%, -50%) scale(0.95)',
          },
          '50%': {
            transform: 'translate(-50%, -50%) scale(1)',
          },
          '75%': {
            transform: 'translate(-50%, -50%) scale(0.95)',
          },
          '100%': {
            transform: 'translate(-50%, -50%) scale(1)',
          },
        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
