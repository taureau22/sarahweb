/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './context/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:   '#E8821A',
        secondary: '#5C3D1E',
        cream:     '#FFF8F0',
        dark:      '#1A1A1A',
        'primary-dark':  '#C46810',
        'primary-light': '#F09A3A',
        'secondary-light': '#8B6340',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        poppins:  ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #E8821A 0%, #C46810 40%, #5C3D1E 100%)',
        'cta-gradient':  'linear-gradient(135deg, #E8821A 0%, #C46810 100%)',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(92,61,30,0.10)',
        'card-hover': '0 8px 40px rgba(232,130,26,0.22)',
      },
      animation: {
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
