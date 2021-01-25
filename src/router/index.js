import Vue from 'vue';
import VueRouter from 'vue-router';

import Authenticated from "@/views/Authenticated.vue";

import KnightBuilder from "@/views/KnightBuilder/KnightBuilder.vue";
import Character from "@/views/Character/Character.vue";
import Store from "@/views/Store/Store.vue";
import Hunts from "@/views/Hunt/Hunts.vue";
import MapReader from "@/views/Maps/MapReader.vue";

Vue.use(VueRouter);

const routes = [
   {
      path: '/',
      name: 'KnightBuilder',
      component: KnightBuilder,
   },
   {
      path: "/app/",
      name: "Authenticated",
      component: Authenticated,
      children: [
         {
            path: "character/:id",
            name: "Character",
            component: Character,
            meta: {
               child: true
            }
         },
         {
            path: "store/",
            name: "Store",
            component: Store,
            meta: {
               child: true
            }
         },
         {
            path: "hunts/",
            name: "Hunts",
            component: Hunts,
            meta: {
               child: true
            }
         },
         {
            path: "hunts/map/:hunt",
            name: "MapReader",
            component: MapReader,
            meta: {
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
