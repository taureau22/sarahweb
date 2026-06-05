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
        primary:        '#E8821A',
        'primary-dark': '#C46810',
        secondary:      '#5C3D1E',
        accent:         '#F5C842',
        cream:          '#FFF8F0',
        'text-light':   '#8B6340',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        fraunces:  ['var(--font-fraunces)',  'Georgia', 'serif'],
        dm:        ['var(--font-dm-sans)',   'system-ui', 'sans-serif'],
        pacifico:  ['var(--font-pacifico)', 'cursive'],
      },
      backgroundImage: {
        'hero-dark':      'linear-gradient(135deg, #5C3D1E 0%, #3D2210 55%, #5C3D1E 100%)',
        'btn-gradient':   'linear-gradient(135deg, #E8821A 0%, #F09A3A 100%)',
        'orange-gradient':'linear-gradient(135deg, #E8821A 0%, #C46810 100%)',
        'dark-gradient':  'linear-gradient(135deg, #5C3D1E 0%, #3D2210 100%)',
        'cream-gradient': 'linear-gradient(180deg, #FFF8F0 0%, #FFE8CC 100%)',
        'orange-light':   'linear-gradient(135deg, rgba(232,130,26,.08) 0%, rgba(240,154,58,.06) 100%)',
      },
      boxShadow: {
        'orange':     '0 8px 32px rgba(232,130,26,.22)',
        'orange-lg':  '0 16px 48px rgba(232,130,26,.35)',
        'orange-xl':  '0 24px 64px rgba(232,130,26,.45)',
        'card':       '0 4px 24px rgba(92,61,30,.10)',
        'card-hover': '0 8px 40px rgba(232,130,26,.22)',
        'dark':       '0 8px 32px rgba(92,61,30,.25)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
