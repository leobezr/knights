import { knights } from "@/service/endpoints";
import Session from "@/session/localSession.js";
import Router from "@/router/index.js";

export default {
   actions: {
      async addPoint({ dispatch }, attr) {
         await knights.addPoint({ attr })

         await dispatch("me");
         return;
      },
      async createCharacter({ dispatch }, user) {
         try {
            await knights.add(user);
            await dispatch("getUserData");
            return;
         } catch (err) {
            throw Error(err);
         }
      },
      async discardInventoryItem({ dispatch }, item) {
         await knights.discardItem({ equip: item })

         dispatch("me");
      },
      async equipItem({ dispatch }, item) {
         await knights.equip({ equip: item })

         dispatch("me");
      },
      async getStoredReward({ dispatch }) {
         await knights.getReward()

         await dispatch("me");
         return;
      },
      async getKnight({ }, id) {
         return await knights.find(id);
      },
      async me({ commit, dispatch }) {
         try {
            if (localStorage.charToken) {
               let persona = await knights.login();

               commit("updatePersona", persona.data);
               return persona.data;
            } else if (localStorage.userToken) {
               return await dispatch("getUserData");
            } else {
               throw "Session ID is invalid";
            }
         } catch (err) {
            Session.clear();

            Router.push({ name: "Login" }).catch(e => { });
            throw err;
         }
      },
      async unequipItem({ dispatch }, props) {
         await knights.unequip({ slot: props.slot })

         dispatch("me");
      },
   },
   mutations: {
      updatePersona(state, data) {
         state.persona = data;
      }
   },
   state: {
      persona: null
   },
   getters: {
      persona: state => state.persona
   },
}
