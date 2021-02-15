import Vue from 'vue';
import Vuex from 'vuex';

import Knights from "./modules/knights";
import Items from "./modules/items";
import Hunt from "./modules/hunt";
import User from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
   modules: {
      Knights,
      Items,
      Hunt,
      User
   },
});
