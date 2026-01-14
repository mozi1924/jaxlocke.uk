/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Syncopate', 'sans-serif'],
      },
      colors: {
        background: '#201f35',
        primary: '#3f89fc',
      }
    },
  },
  plugins: [],
}
