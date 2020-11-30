import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import theme from "./theme";

Vue.use(Vuetify);

export default new Vuetify({
   icons: {
      iconfont: "mdi"
   },
   theme: {
      themes: {
         light: {
            primary: theme.primary,
            secondary: theme.secondary,
            anchor: theme.secondary,
            background: theme.background,
         }
      },
   },
});
