/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: '#07070b',
        surface: {
          DEFAULT: '#0f0f17',
          elevated: '#171723',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          glow: '#a78bfa',
          hover: '#7c3aed',
        },
        accent2: {
          DEFAULT: '#06b6d4',
          glow: '#22d3ee',
          hover: '#0891b2',
        },
        accent3: {
          DEFAULT: '#ec4899',
          glow: '#f472b6',
        },
        muted: '#94a3b8',
        subtle: '#64748b',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 20px -5px rgba(139, 92, 246, 0.25)',
        'glow-md': '0 0 30px -5px rgba(139, 92, 246, 0.4), 0 0 20px -5px rgba(6, 182, 212, 0.3)',
        'glow-lg': '0 0 50px -5px rgba(139, 92, 246, 0.5), 0 0 30px -5px rgba(6, 182, 212, 0.4)',
        'glow-cyan': '0 0 30px -5px rgba(6, 182, 212, 0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
