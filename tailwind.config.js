/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#dcf1dc',
          200: '#b9e3b9',
          300: '#8fcf8f',
          400: '#4db74d',  // Verde Maranhão
          500: '#348e34',
          600: '#1c681c',
          700: '#125712',
          800: '#0e450e',
          900: '#0a380a',
        },
        secondary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#dc2626',  // Vermelho Maranhão
          600: '#b91c1c',
          700: '#991b1b',
          800: '#7f1d1d',
          900: '#701414',
        },
        tertiary: {
          50: '#eff6ff', 
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',  // Azul Maranhão
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 