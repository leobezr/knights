<template>
   <div id="hunts">
      <div class="landscape" :style="backgroundImage">
         <div class="huntingOptions">
            <CardBody v-for="(monster, index) in monsterList" :key="index">
               <div class="monsterCanvas">
                  <MonsterHunt :monster-data="monster" />
               </div>
               <div class="monsterBadge">{{ monster.name }}</div>
               <div class="monsterLoot"></div>
               <div class="controller">
                  <v-btn
                     class="deep-orange accent-4 white--text"
                     @click="sendToMap(monster)"
                  >
                     <v-icon left>mdi-sword</v-icon> Fight
                  </v-btn>
               </div>
            </CardBody>
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions } from "vuex";
import bgImage from "@/shared/img/dungeon.jpg";
import CardBody from "@/shared/components/AD/atoms/CardBody.vue";
import MonsterHunt from "@/views/Hunt/shared/AD/atoms/MonsterHunt.vue";
import Maps from "@/views/Hunt/shared/maps/index.js";
import "@/views/Hunt/shared/scss/_hunts.scss";

export default {
   name: "Hunts",
   data() {
      return {
         monsterList: [...Maps],
      };
   },
   computed: {
      backgroundImage() {
         return `background-image: url(${bgImage});`;
      },
   },
   components: {
      CardBody,
      MonsterHunt,
   },
   methods: {
      ...mapActions(["me"]),

      sendToMap(monster) {
         this.$router
            .push({
               name: "MapReader",
               params: { hunt: monster.name.toLowerCase() },
            })
            .catch((e) => {});
      },
      checkRewards() {
         const rewards = sessionStorage.length
            ? JSON.parse(sessionStorage.reward)
            : null;

         if (rewards) {
            console.log(rewards);
            sessionStorage.clear();
         }
      },
      init() {
         this.me();
         this.checkRewards();
      },
   },
   created() {
      this.init();
   },
};
</script>
