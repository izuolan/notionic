const BLOG = require('./blog.config')
const { fontFamily } = require('tailwindcss/defaultTheme')
const CJK = require('./lib/cjk')
const fontSansCJK = !CJK()
  ? []
  : [`"Noto Sans CJK ${CJK()}"`, `"Noto Sans ${CJK()}"`]
const fontSerifCJK = !CJK()
  ? []
  : [`"Noto Serif CJK ${CJK()}"`, `"Noto Serif ${CJK()}"`]

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.js', './components/**/*.js', './layouts/**/*.js'],
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {
    extend: {
      colors: {
        day: BLOG.lightBackground || '#ffffff',
        night: BLOG.darkBackground || '#000000'
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
  plugins: []
}
