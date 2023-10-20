/** @type {import('tailwindcss').Config} */
const plugins = require('tailwindcss/plugin')
module.exports = {
  important:true,
  content: [],
  theme: {
    extend: {
      backgroundImage: {
        'back': "url('/img/back.png')",
      },
    },
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

