import { hunt } from "@/service/endpoints.js";

export default {
   actions: {
      // Hunt Related Actions
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
      },

      // Party Related Actions
      async createParty({ dispatch }) {
         await hunt.createParty();
         return await dispatch("me");
      },
      async joinParty({ dispatch }, partyId) {
         await hunt.joinParty({ id: partyId });
         return await dispatch("me");
      },
      async removeParty({ dispatch }, playerId) {
         await hunt.removeParty({ id: playerId });
         return await dispatch("me");
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
