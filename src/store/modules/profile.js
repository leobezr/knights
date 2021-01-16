import { profile } from "@/service/endpoints";
import Session from "@/session/localSession.js";
import Router from "@/router/index.js";

export default {
   actions: {
      async me({ commit }) {
         try {
            if (localStorage.sessionId) {
               let persona = await profile.get();

               commit("updatePersona", persona.data);
               return persona.data;
            } else {
               throw "Session ID is invalid";
            }
         } catch (err) {
            Session.clear();

            Router.push({ name: "KnightBuilder" }).catch(e => { });
            throw err;
         }
      }
   },
   mutations: {
      updatePersona(state, data) {
         state.persona = data.length ? data[0] : {};
      }
   },
   state: {
      persona: null
   },
   getters: {
      persona: state => state.persona
   },
}
