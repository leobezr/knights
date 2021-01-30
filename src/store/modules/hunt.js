import { hunt } from "@/service/endpoints.js";

export default {
   actions: {
      async getReward({ dispatch }, battleId) {
         await hunt.reward({
            id: battleId
         })

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
