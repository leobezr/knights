import { hunt } from "@/service/endpoints.js";

export default {
   actions: {
      // Hunt Related Actions
      /**
       * @deprecated
       * These functions rely on client-side processing, which isn't ideal for a game
       * They're being removed since version 0.7.0
       */

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

      /**
       * @PARTY
       * These functions are party related functions
       * Since party is really only related to hunting, it's here.
       */
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
      },

      /**
       * @BATTLE
       * Client side will alert the server of a battle and push all client members to the room,
       * the client can update the server on every player joining the room, and leaving it, but it shouldn't generate an ID for each player.
       *
       * That issue will be handed by the server. Client just needs to alert the server who's joining the room.
       */
      async generateBattleSession({ }, creatureId) {
         const BATTLE_ID = await hunt.partyBattle({ monster: creatureId })
         return BATTLE_ID.data;
      },
      async requestBattleAnimations({ }, battleId) {
         return await hunt.startBattle({ session: battleId });
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
