/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'work-sans': ['Work Sans Variable', 'Work Sans', 'sans-serif'],
      },
      colors: {
        'background': 'var(--background)',
        'foreground': 'var(--foreground)',
        'headings': 'var(--headings)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}