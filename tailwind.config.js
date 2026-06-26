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
        terracotta: '#C0552F',
        'terra-2':  '#E8724A',
        'terra-bg': '#FBE8DF',
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
        card:  '0 4px 24px 0 rgba(28,18,8,0.09)',
        lift:  '0 8px 40px 0 rgba(28,18,8,0.13)',
        terra: '0 4px 24px 0 rgba(192,85,47,0.20)',
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
