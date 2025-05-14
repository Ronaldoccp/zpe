/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maranhao: {
          red: '#C5161C',       // Vermelho do MA
          blue: '#0057A6',      // Azul do RA com estrela
          green: '#009639',     // Verde do NHÃ
          yellow: '#FFAD00',    // Amarelo/laranja do O
          white: '#FFFFFF',     // Branco (estrela e texto)
          black: '#1D1D1B',     // Preto (texto "GOVERNO DO" e "TRABALHANDO PARA TODOS")
        },
        primary: {
          50: '#e6f5ec',
          100: '#ccead9',
          200: '#99d6b3',
          300: '#66c18d',
          400: '#33ad66',
          500: '#009639',      // Verde Maranhão
          600: '#00782e',
          700: '#005a22',
          800: '#003c17',
          900: '#001e0b',
        },
        secondary: {
          50: '#f9e5e6',
          100: '#f4ccce',
          200: '#e8999d',
          300: '#dd666c',
          400: '#d1333b',
          500: '#C5161C',      // Vermelho Maranhão
          600: '#9e1216',
          700: '#760d11',
          800: '#4f090b',
          900: '#270406',
        },
        tertiary: {
          50: '#e0ebf7',
          100: '#c1d8ef',
          200: '#83b1df',
          300: '#448acf',
          400: '#0670C0',
          500: '#0057A6',      // Azul Maranhão
          600: '#004685',
          700: '#003464',
          800: '#002342',
          900: '#001121',
        },
        accent: {
          50: '#fff5e0',
          100: '#ffebc2',
          200: '#ffd785',
          300: '#ffc447',
          400: '#ffb609',
          500: '#FFAD00',      // Amarelo/Laranja Maranhão
          600: '#cc8a00',
          700: '#996800',
          800: '#664500',
          900: '#332300',
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