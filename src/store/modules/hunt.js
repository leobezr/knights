import { hunt } from "@/service/endpoints.js";

export default {
   actions: {
      async getReward({ dispatch }, battleId) {
         await hunt.reward(battleId)

         return await dispatch("me");
      },
      async getBossReward({ dispatch }, battleLog) {
         await hunt.bossReward(battleLog)

         return await dispatch("me");
      },
      async getHuntLevels({ commit }) {
         let huntLevels = await hunt.huntLevels();
         commit("updateHuntLevels", huntLevels.data);
      },
      async getBossLevels({ commit }) {
         let bosses = await hunt.bosses();
         commit("updateBossLevels", bosses.data);
      }
   },
   mutations: {
      updateItemGallery(state, itemList) {
         state.gallery = itemList;
      },
      updateHuntLevels(state, hunts) {
         state.huntLevels = {};

         for (let key in hunts) {
            if (typeof hunts[key] == "object") {
               state.huntLevels[key] = hunts[key];
            }
         }
      },
      updateBossLevels(state, hunts) {
         state.bossLevel = {};

         for (let key in hunts) {
            if (typeof hunts[key] == "object") {
               state.bossLevels[key] = hunts[key];
            }
         }
      },
   },
   state: {
      gallery: [],
      huntLevels: {},
      bossLevels: {}
   },
   getters: {

   }
}
