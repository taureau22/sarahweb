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
        // ===== Artisan Chaud — palette terre =====
        cream:      '#FBF5EC',   // fond principal (crème chaud)
        'cream-2':  '#F4E9D8',   // fond section alterné (sable clair)
        surface:    '#FFFFFF',   // cartes
        void:       '#0D0806',   // fond sections immersives (noir chaud)
        'void-soft':'#1A1008',   // fond sections alternées sombres
        ink:        '#241A10',   // texte principal (brun quasi-noir)
        'ink-soft': '#5C4B38',   // texte secondaire
        muted:      '#8A7660',   // texte tertiaire / labels
        terracotta: {
          DEFAULT: '#B0512E',    // primaire (boutons, blanc lisible dessus)
          dark:    '#933F22',    // hover
          soft:    '#C9764F',    // accents clairs
          tint:    '#F3E2D6',    // fonds très clairs
        },
        clay:    '#D98E4A',      // accent ambre chaud
        olive:   '#6B7B3C',      // accent secondaire (frais / végétal)
        border:  '#E7D8C3',      // bordures chaudes
        whatsapp: { DEFAULT: '#25D366', dark: '#1DA851' },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft':   '0 1px 2px rgba(36,26,16,.04), 0 8px 24px rgba(36,26,16,.06)',
        'card':   '0 2px 4px rgba(36,26,16,.04), 0 12px 32px rgba(36,26,16,.08)',
        'lift':   '0 8px 16px rgba(36,26,16,.06), 0 24px 48px rgba(36,26,16,.12)',
        'terra':  '0 8px 24px rgba(176,81,46,.22)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      transitionDuration: { '250': '250ms', '350': '350ms', '400': '400ms' },
      spacing: { '18': '4.5rem', '22': '5.5rem' },
      maxWidth: { '8xl': '88rem' },
      letterSpacing: { tightest: '-0.04em' },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'float':   'float 7s ease-in-out infinite',
      },
      screens: {
        'xs': '375px', 'sm': '640px', 'md': '768px',
        'lg': '1024px', 'xl': '1280px', '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
