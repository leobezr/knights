import { user } from "@/service/endpoints";
import Session from "@/session/localSession.js";
import Router from "@/router/index.js";

export default {
   actions: {
      async createUser({ }, credentials) {
         try {
            await user.create({
               email: credentials.email,
               password: credentials.password
            });

            return true;
         } catch (err) {
            Session.clear();

            Router.push({ name: "Login" }).catch(e => { });
            throw err;
         }
      },
      async getUserData({ commit }) {
         try {
            const userData = await user.getUserData();

            commit("storeUserData", userData.data);
         } catch (err) {
            Session.clear();

            Router.push({ name: "Login" }).catch(e => { });
            throw err;
         }
      },
      async getCharList({ commit }) {
         try {
            const charList = await user.getCharList();
            commit("updateCharList", charList.data);
         } catch (err) {
            throw Error(err);
         }
      },
      async loginUser({ commit }, credentials) {
         try {
            const userToken = await user.login({
               email: credentials.email,
               password: credentials.password
            });

            if (userToken?.data?.token) {
               commit("updateUserTokenToStorage", userToken.data.token);
               return userToken.data.token;
            } else {
               throw Error("No token");
            }
         } catch (err) {
            Session.clear();

            Router.push({ name: "Login" }).catch(e => { });
            throw err;
         }
      },
      async validateUserEmail({ commit }, emailId) {
         const userToken = await user.validateEmail(emailId);

         if (userToken?.data?.token) {
            commit("updateUserTokenToStorage", userToken.data.token)
            return userToken.data.token;
         } else {
            throw Error("Invalid email Id");
         }
      },
   },
   mutations: {
      updateUserTokenToStorage(state, token) {
         localStorage.userToken = token;
      },
      storeUserData(state, data) {
         state.userData = data;
      },
      updateCharList(state, list) {
         state.charList = list;
      }
   },
   state: {
      userData: null,
      charList: []
   },
   getters: {

   },
}
