import { hunt } from "@/service/endpoints.js";

export default {
   actions: {
      async getReward({ dispatch }, battleId) {
         await hunt.reward(battleId)

         return await dispatch("me");
      },
   },
   mutations: {
      updateItemGallery(state, itemList) {
         state.gallery = itemList;
      }
   },
   state: {
      gallery: []
   },
   getters: {

   }
}
