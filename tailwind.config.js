/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#142B52',
          navy: '#0E1F3D',
          dark: '#0B162C',
          secondary: '#2457A7',
          blue: '#1E4E96',
          lightBlue: '#E8F1FC',
          accent: '#D6A84F',
          gold: '#C5953B',
          lightGold: '#FDF7EB',
          bg: '#F5F7FB',
          card: '#FFFFFF',
          text: '#17243A',
          muted: '#62728D',
          border: '#E2E8F0',
          success: '#10B981',
          warning: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(20, 43, 82, 0.08), 0 2px 6px -1px rgba(20, 43, 82, 0.04)',
        'card-hover': '0 20px 30px -10px rgba(20, 43, 82, 0.16), 0 8px 16px -4px rgba(20, 43, 82, 0.08)',
        'card-selected': '0 12px 28px -6px rgba(36, 87, 167, 0.25), 0 0 0 2px #2457A7',
        'gold-glow': '0 0 25px rgba(214, 168, 79, 0.35)',
      }
    },
  },
  plugins: [],
}
