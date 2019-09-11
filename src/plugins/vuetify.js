import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)
Vue.config.productionTip = false

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        // primary: colors.red.darken1, // #E53935
        // secondary: colors.red.lighten4, // #FFCDD2
        // accent: colors.indigo.base, // #3F51B5
        dialogHeader: colors.blue.darken1,
        dialogBut1: colors.orange.base,
        dialogBut2: colors.orange.darken2,
        dialogBut3: colors.orange.darken4,
        dialogBut4: colors.teal.darken3,
        dialogBut5: colors.deepOrange.darken4,

        filterBut1: colors.deepOrange.lighten1,
        filterBut2: colors.orange.lighten1,
        filterBut3: colors.amber.darken4,

        links: colors.deepOrange.lighten2,
        selectedColors: colors.amber.darken4,
      },
    },
  },
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
})
