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
        'primary-dark': '#C4681A',
        secondary:      '#1A0A00',
        accent:         '#F5C842',
        cream:          '#FFF8EE',
        'text-light':   '#6B4C2A',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        fraunces:  ['var(--font-fraunces)',  'Georgia', 'serif'],
        dm:        ['var(--font-dm-sans)',   'system-ui', 'sans-serif'],
        pacifico:  ['var(--font-pacifico)', 'cursive'],
      },
      backgroundImage: {
        'hero-dark':      'linear-gradient(135deg, #1A0A00 0%, #3D1A00 55%, #1A0A00 100%)',
        'btn-gradient':   'linear-gradient(135deg, #E8821A 0%, #F5C842 100%)',
        'orange-gradient':'linear-gradient(135deg, #E8821A 0%, #C4681A 100%)',
        'dark-gradient':  'linear-gradient(135deg, #1A0A00 0%, #2A0E00 100%)',
        'cream-gradient': 'linear-gradient(180deg, #FFF8EE 0%, #FFF0D6 100%)',
        'orange-light':   'linear-gradient(135deg, rgba(232,130,26,.08) 0%, rgba(245,200,66,.06) 100%)',
      },
      boxShadow: {
        'orange':     '0 8px 32px rgba(232,130,26,.22)',
        'orange-lg':  '0 16px 48px rgba(232,130,26,.35)',
        'orange-xl':  '0 24px 64px rgba(232,130,26,.45)',
        'card':       '0 4px 20px rgba(26,10,0,.07)',
        'card-hover': '0 14px 40px rgba(232,130,26,.18)',
        'dark':       '0 8px 32px rgba(26,10,0,.25)',
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
