<template>
   <div id="app">
      <v-app>
         <Navigation />
      </v-app>
   </div>
</template>

<script>
import "@/shared/scss/global.scss";
import Navigation from "@/shared/components/navi/Navigation.vue";

export default {
   components: {
      Navigation,
   },
};
</script>
