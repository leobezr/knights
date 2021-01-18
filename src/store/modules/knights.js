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
      }
   },
   mutations: {

   },
   state: {

   },
   getters: {

   }
}
