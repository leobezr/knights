<template>
   <div class="contentGrid" boss-type>
      <div class="groupLevel" v-for="(group, i) of bossLevels" :key="i">
         <h3>
            {{ groupLevel(group) }}
            <v-tooltip
               bottom
               v-if="!canAcessLevel(group)"
               color="deep-purple darken-4"
            >
               <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" color="error"
                     >mdi-information-outline</v-icon
                  >
               </template>
               <span
                  >You can open new levels killing the boss in the BOSS FIGHT
                  tab</span
               >
            </v-tooltip>
         </h3>
         <div class="huntingOptions" :permission="canAcessLevel(group)">
            <CardBody v-for="(monster, index) in group.challenge" :key="index">
               <template v-slot:content>
                  <div class="monsterCanvas">
                     <MonsterHunt :monster-data="monster" />
                  </div>
                  <div class="monsterBadge">
                     {{ monster.name }}
                  </div>
                  <div class="monsterLoot"></div>
               </template>
            </CardBody>
         </div>
         <div class="d-flex justify-center align-center flex-row mt-5">
            <v-btn
               class="deep-orange accent-4 white--text"
               v-if="canAcessLevel(group)"
               @click="sendToMap(groupLevel(group))"
            >
               <v-icon left>mdi-sword</v-icon> Fight
            </v-btn>
         </div>
      </div>
   </div>
</template>

<script>
import { mapState } from "vuex";
import CardBody from "@/shared/components/AD/atoms/CardBody.vue";
import MonsterHunt from "@/views/Hunt/shared/AD/atoms/MonsterHunt.vue";

export default {
   name: "BossLevelGrid",
   components: {
      CardBody,
      MonsterHunt,
   },
   computed: {
      ...mapState({
         bossLevels: (store) => store.Hunt.bossLevels,
      }),

      groupLevel() {
         return (group) => {
            let keyName = null;

            for (let hunt in this.bossLevels) {
               if (this.bossLevels[hunt] == group) {
                  keyName = hunt;
                  break;
               }
            }
            return keyName || "0-15";
         };
      },
      canAcessLevel() {
         return (group) => {
            if (this.userData) {
               let permission = this.userData.unlocked.hunt;
               let level = this.groupLevel(group);

               return permission.includes(level);
            }
            return false;
         };
      },
   },
   methods: {
      sendToMap(groupLevel) {
         this.$router
            .push({
               name: "BossFight",
               params: { bossLevel: groupLevel },
            })
            .catch((e) => {});
      },
   },
   props: {
      "user-data": {
         type: [Object, Boolean],
         required: true,
      },
   },
};
</script>
