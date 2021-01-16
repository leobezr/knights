<template>
   <div id="character">
      <div class="landscape" :darken="darkBackground" :style="backgroundImage">
         <div class="knight-menu">
            Hello
         </div>
      </div>
   </div>
</template>

<script>
import bgImage from "@/shared/img/blacksmith.jpg";
import TabOptions from "@/views/KnightBuilder/components/TabOptions.vue";
import "./scss/_character.scss";
import { mapActions } from "vuex";

export default {
   name: "KnightBuilder",
   data() {
      return {
         darkenLandscape: false,
      };
   },
   computed: {
      backgroundImage() {
         return `background-image: url(${bgImage});`;
      },
      darkBackground() {
         return this.darkenLandscape;
      },
   },
   components: {
      TabOptions,
   },
   methods: {
      ...mapActions(["me"]),

      darkenBackground() {
         setTimeout(() => (this.darkenLandscape = true), 1000);
      },
      init() {
         this.setSession();
         this.me();
      },
      setSession() {
         const ROUTE = this.$route;

         if (ROUTE?.params?.id) {
            localStorage.sessionId = ROUTE.params.id;
         }
      },
   },
   mounted() {
      this.darkenBackground();
   },
   created() {
      this.init();
   },
};
</script>
