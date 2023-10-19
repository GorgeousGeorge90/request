/** @type {import('tailwindcss').Config} */
const plugins = require('tailwindcss/plugin')
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
      plugins(function ({addComponents}) {
        addComponents({
          '.base_container': {
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
          }
        })
      })
  ],
}

