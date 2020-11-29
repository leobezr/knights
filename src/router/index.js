import Vue from 'vue';
import VueRouter from 'vue-router';

import KnightBuilder from "@/views/KnightBuilder/KnightBuilder.vue";

Vue.use(VueRouter);

const routes = [
   {
      path: '/',
      name: 'KnightBuilder',
      component: KnightBuilder,
   },
];

const router = new VueRouter({
   routes,
});

export default router;
