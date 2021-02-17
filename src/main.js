import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import '@babel/polyfill'
import VCurrencyField from 'v-currency-field'
import VueSocketIO from "vue-socket.io";

Vue.config.productionTip = false;
Vue.use(VCurrencyField, {
   locale: 'en-US',
   decimalLength: 2,
   autoDecimalMode: true,
   min: null,
   max: null,
   defaultValue: 0,
   valueAsInteger: false,
   allowNegative: true
})

Vue.use(new VueSocketIO({
   debug: true,
   connection: process.env.VUE_APP_PUBLIC,
   vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
   },
   transportOptions: {
      polling: {
         extraHeaders: {
            "Access-Control-Allow-Origin": "*",
            token: "123"
         }
      }
   }
}))

new Vue({
   router,
   store,
   vuetify,
   render: (h) => h(App)
}).$mount('#app');
