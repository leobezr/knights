import Vue from 'vue';
import Vuex from 'vuex';

import Knights from "./modules/knights";
import Profile from "./modules/profile";

Vue.use(Vuex);

export default new Vuex.Store({
   modules: {
      Knights,
      Profile
   },
});
