/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "scale-300": "#232323",
        "scale-1200": "#ededed",
        "blue-brand": "#569cd6",
        "aqua-brand": "#00CED1",
        "brand-900": "#3fcf8e",
        "brand-800": "#6ee7b7",
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5715' }],
        base: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.017em' }],
        lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.017em' }],
        xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.017em' }],
        '2xl': ['1.5rem', { lineHeight: '1.415', letterSpacing: '-0.017em' }],
        '3xl': ['1.875rem', { lineHeight: '1.333', letterSpacing: '-0.017em' }],
        '4xl': ['2.25rem', { lineHeight: '1.277', letterSpacing: '-0.017em' }],
        '5xl': ['2.75rem', { lineHeight: '1.2', letterSpacing: '-0.017em' }],
        '6xl': ['3.5rem', { lineHeight: '1', letterSpacing: '-0.017em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.017em' }],
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.01em',
        wider: '0.02em',
        widest: '0.4em',
      },
      animation: {
        'endless': 'endless 20s linear infinite',
      },
      keyframes: {
        'endless': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-245px)' }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};