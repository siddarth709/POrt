/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: '#050508',
        technical: '#0a0b10',
        surface: {
          DEFAULT: '#0e0f17',
          elevated: '#141521',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        accent: {
          DEFAULT: '#10b981', // algorithmic emerald
          glow: '#34d399',
          hover: '#059669',
        },
        accent2: {
          DEFAULT: '#06b6d4', // electric cyan
          glow: '#22d3ee',
          hover: '#0891b2',
        },
        accent3: {
          DEFAULT: '#8b5cf6', // refined violet
          glow: '#a78bfa',
        },
        muted: '#8e96a8',
        subtle: '#525866',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', '"Space Grotesk"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'elevated': '0 16px 36px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'glow-teal': '0 0 30px -10px rgba(16, 185, 129, 0.25)',
        'glow-cyan': '0 0 30px -10px rgba(6, 182, 212, 0.25)',
      },
      letterSpacing: {
        'widest-editorial': '0.2em',
      },
    },
  },
  plugins: [],
};
