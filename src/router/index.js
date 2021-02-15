import Vue from 'vue';
import VueRouter from 'vue-router';

import Authenticated from "@/views/Authenticated.vue";

import Login from "@/views/Login/Login.vue"
import Character from "@/views/Character/Character.vue";
import Store from "@/views/Store/Store.vue";
import Hunts from "@/views/Hunt/Hunts.vue";
import BossFight from "@/views/BossFight/BossFight.vue";
import HuntingGround from "@/views/HuntingGround/HuntingGround.vue";

Vue.use(VueRouter);

const routes = [
   {
      path: '/:request',
      name: 'Login',
      component: Login,
      meta: {
         soundtrack: "login",
      }
   },
   {
      path: "/app/",
      name: "Authenticated",
      component: Authenticated,
      children: [
         {
            path: "character/",
            name: "Character",
            component: Character,
            meta: {
               soundtrack: "default",
               child: true
            }
         },
         {
            path: "store/",
            name: "Store",
            component: Store,
            meta: {
               soundtrack: "shop",
               child: true
            }
         },
         {
            path: "hunts/",
            name: "Hunts",
            component: Hunts,
            meta: {
               soundtrack: "default",
               child: true
            }
         },
         {
            path: "hunts/boss/:bossLevel",
            name: "BossFight",
            component: BossFight,
            meta: {
               soundtrack: "boss",
               child: true
            }
         },
         {
            path: "hunts/map/:hunt",
            name: "HuntingGround",
            component: HuntingGround,
            meta: {
               soundtrack: "hunt",
               child: true
            }
         }
      ]
   }
];

const router = new VueRouter({
   routes,
});

export default router;
