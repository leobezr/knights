<template>
   <div id="knight-builder">
      <div class="landscape" :darken="darkBackground" :style="backgroundImage">
         <div class="knight-menu">
            <TabOptions />
         </div>
      </div>
   </div>
</template>

<script>
import bgImage from "@/shared/img/background.jpg";
import TabOptions from "@/views/KnightBuilder/components/TabOptions.vue";
import "@/views/KnightBuilder/scss/_knightBuilder.scss";

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
