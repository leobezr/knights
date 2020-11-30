<template>
   <div id="character">
      <div class="landscape" :darken="darkBackground" :style="backgroundImage">
         <div class="knight-menu">
            <TabOptions />
         </div>
      </div>
   </div>
</template>

<script>
import bgImage from "@/shared/img/blacksmith.jpg";
import TabOptions from "@/views/KnightBuilder/components/TabOptions.vue";
import "./scss/_character.scss";

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
      darkenBackground() {
         setTimeout(() => (this.darkenLandscape = true), 1000);
      },
   },
   mounted() {
      this.darkenBackground();
   },
};
</script>
