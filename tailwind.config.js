const BLOG = require('./blog.config')
const { fontFamily } = require('tailwindcss/defaultTheme')
const CJK = require('./lib/cjk')
const fontSansCJK = !CJK()
  ? []
  : [`"Noto Sans CJK ${CJK()}"`, `"Noto Sans ${CJK()}"`]
const fontSerifCJK = !CJK()
  ? []
  : [`"Noto Serif CJK ${CJK()}"`, `"Noto Serif ${CJK()}"`]

module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.js', './components/**/*.js', './layouts/**/*.js'],
  // darkMode: BLOG.appearance === 'auto' ? 'media' : 'class', // or 'media' or 'class'
  darkMode: 'class', // or 'media' or 'class'
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {
    extend: {
      colors: {
        day: {
          DEFAULT: BLOG.lightBackground || '#ffffff'
        },
        night: {
          DEFAULT: BLOG.darkBackground || '#000000'
        }
      },
      fontFamily: {
        sans: [...fontFamily.sans, ...fontSansCJK],
        serif: [...fontFamily.serif, ...fontSerifCJK],
        noEmoji: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif'
        ]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
