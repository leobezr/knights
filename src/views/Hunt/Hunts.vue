<template>
   <div id="hunts">
      <div class="landscape" :style="backgroundImage">
         <div class="containerGrid">
            <v-tabs v-model="tab" align-with-title dark>
               <v-tabs-slider color="primary"></v-tabs-slider>
               <v-tab> Hunts </v-tab>
               <v-tab> Boss Fight </v-tab>
            </v-tabs>

            <v-tabs-items dark v-model="tab">
               <v-tab-item>
                  <NormalLevelGrid :user-data="userData" />
               </v-tab-item>
               <v-tab-item>
                  <BossLevelGrid :user-data="userData" />
               </v-tab-item>
            </v-tabs-items>
         </div>
      </div>
      <Rewards />
   </div>
</template>

<script>
import { mapActions } from "vuex";
import bgImage from "@/shared/img/dungeon.jpg";
import Rewards from "@/views/Hunt/shared/AD/molecules/Rewards.vue";
import NormalLevelGrid from "@/views/Hunt/shared/AD/organisms/NormalLevelGrid.vue";
import BossLevelGrid from "@/views/Hunt/shared/AD/organisms/BossLevelGrid.vue";
import "@/views/Hunt/shared/scss/_hunts.scss";

export default {
   name: "Hunts",
   data() {
      return {
         tab: null,
         userInfo: null,
      };
   },
   computed: {
      backgroundImage() {
         return `background-image: url(${bgImage});`;
      },
      userData() {
         return this.userInfo ?? false;
      },
   },
   components: {
      Rewards,
      NormalLevelGrid,
      BossLevelGrid,
   },
   methods: {
      ...mapActions(["me", "getHuntLevels", "getBossLevels"]),

      checkRewards() {
         const rewards = sessionStorage.length
            ? JSON.parse(sessionStorage.reward)
            : null;

         if (rewards) {
            sessionStorage.clear();
         }
      },
      async init() {
         this.me().then((user) => (this.userInfo = user));
         this.checkRewards();

         await this.getHuntLevels();
         await this.getBossLevels();
      },
   },
   created() {
      this.init();
   },
};
</script>
