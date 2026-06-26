/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './context/**/*.{js,jsx}',
    './data/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:         '#F8F3EB',
        surface:    '#FFFFFF',
        ink:        '#1C1208',
        'ink-2':    '#4A3520',
        muted:      '#8C7055',
        terracotta: '#EA8A2E',
        'terra-2':  '#F2A24E',
        'terra-bg': '#FCEBD7',
        gold:       '#C49A3C',
        dark:       '#1C1208',
        border:     '#E8DDD0',
        olive:      '#6B6B3A',
        whatsapp:   '#25D366',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft:  '0 2px 16px 0 rgba(28,18,8,0.06)',
        card:  '0 6px 28px -8px rgba(28,18,8,0.12)',
        lift:  '0 12px 44px -10px rgba(28,18,8,0.20)',
        terra: '0 8px 28px -6px rgba(234,138,46,0.45)',
        bar:   '0 -6px 30px -8px rgba(28,18,8,0.18)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        float:   'float 7s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      maxWidth: {
        '8xl': '88rem',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tight:    '-0.02em',
      },
      screens: {
        xs:    '375px',
        sm:    '640px',
        md:    '768px',
        lg:    '1024px',
        xl:    '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
