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
        // ===== Le Matin à Abidjan — palette dark-first =====
        void:      '#0C0806',    // fond principal sombre
        'void-2':  '#181008',    // cartes sur fond sombre
        'void-soft': '#181008',  // alias rétrocompatibilité
        cream:     '#FBF5EC',    // sections claires
        'cream-2': '#F0E4D0',    // sections claires alternées
        surface:   '#FFFFFF',    // cartes blanches
        terracotta: {
          DEFAULT: '#B0512E',    // couleur primaire
          dark:    '#8F3F1E',    // hover
          soft:    '#C97050',    // accents clairs
          tint:    '#F3E2D6',    // fonds très clairs
        },
        clay:      '#D48A40',    // accent ambre
        ink:       '#1E1408',    // texte principal
        'ink-soft':'#5A4530',    // texte secondaire
        muted:     '#8A7060',    // texte tertiaire
        border:    '#E5D4BE',    // bordures
        // ===== Conservés pour composants existants =====
        olive:     '#6B7B3C',    // accent végétal (CartDrawer, panier)
        whatsapp:  { DEFAULT: '#25D366', dark: '#1DA851' },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft:  '0 1px 2px rgba(30,20,8,.04), 0 8px 24px rgba(30,20,8,.06)',
        card:  '0 2px 4px rgba(30,20,8,.04), 0 12px 32px rgba(30,20,8,.08)',
        lift:  '0 8px 16px rgba(30,20,8,.06), 0 24px 48px rgba(30,20,8,.12)',
        terra: '0 8px 24px rgba(176,81,46,.22)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: { '8xl': '88rem' },
      letterSpacing: { tightest: '-0.04em' },
      animation: {
        marquee: 'marquee 28s linear infinite',
        float:   'float 7s ease-in-out infinite',
      },
      screens: {
        xs:  '375px',
        sm:  '640px',
        md:  '768px',
        lg:  '1024px',
        xl:  '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
