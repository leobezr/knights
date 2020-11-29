<template>
   <div id="knight-builder">
      <div class="landscape" :style="backgroundImage" :darken="darkBackground">
         Knight
      </div>
   </div>
</template>

<script>
import "@/views/KnightBuilder/scss/_knightBuilder.scss";
import bgImage from "@/shared/img/background.jpg";

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
