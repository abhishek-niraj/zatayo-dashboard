/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/dashboard/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        lightGray: '#F5F6FA',
        blueButton: '#4880FF',
        cancelButtonColor: '#D1D5DB',
      },
      height: {
        'calc-screen': 'calc(100vh - 56px)',
      },
    },
  },
  plugins: [],
};
