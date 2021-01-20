<template>
   <div id="character">
      <div class="landscape" :style="backgroundImage">
         <div class="store">
            Store
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions } from "vuex";
import bgImage from "@/shared/img/store-background.jpg";
import "@/views/Character/shared/scss/_character.scss";

export default {
   name: "Store",
   computed: {
      backgroundImage() {
         return `background-image: url(${bgImage});`;
      },
   },
   components: {

   },
   methods: {
      ...mapActions(["me"]),

      init() {
         this.me().finally(() => (this.fetchingProfileData = false));
      },
   },
   created() {
      this.init();
   },
};
</script>
