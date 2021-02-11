import { items } from "@/service/endpoints";

export default {
   actions: {
      async getItemsGallery({ commit }) {
         const ITEM_LIST = await items.get();

         commit("updateItemGallery", ITEM_LIST.data);
      },
      async buyItemFromStore({ dispatch }, item) {
         await items.buy({
            id: localStorage.sessionId,
            item
         })

         dispatch("me");
      },
      async sellInventoryItem({ dispatch }, item) {
         await items.sell({
            id: localStorage.sessionId,
            item
         })

         dispatch("me");
      },
      async sellAllInventory({ dispatch }) {
         await items.sellAllInventory({
            id: localStorage.sessionId,
         })

         dispatch("me");
      }
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
