import { knights } from "@/service/endpoints";
import Session from "@/session/localSession";

export default {
   actions: {
      async createKnight({ }, user) {
         try {
            let req = await knights.create(user);

            Session.startNewSession(req.data.id);
            return req.data;
         } catch (err) {
            throw new Error(err);
         }

      },
      async getKnight({ }, id) {
         return await knights.find(id);
      },
      async equipItem({ dispatch }, item) {
         await knights.equip({
            id: localStorage.sessionId,
            equip: item
         })

         dispatch("me");
      },
      async unequipItem({ dispatch }, props) {
         await knights.unequip({
            id: localStorage.sessionId,
            slot: props.slot
         })

         dispatch("me");
      },
      async discardInventoryItem({ dispatch }, item) {
         await knights.discardItem({
            id: localStorage.sessionId,
            equip: item
         })

         dispatch("me");
      },
      async addPoint({ dispatch }, attr) {
         await knights.addPoint({
            id: localStorage.sessionId,
            attr
         })

         await dispatch("me");
         return;
      },
      async getStoredReward({ dispatch }) {
         await knights.getReward()

         await dispatch("me");
         return;
      }
   },
   mutations: {

   },
   state: {

   },
   getters: {

   }
}
