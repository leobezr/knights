<template>
   <div class="contentGrid">
      <div class="groupLevel" v-for="(group, i) of huntLevels" :key="i">
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
            <CardBody v-for="(monster, index) in group.monsters" :key="index">
               <template v-slot:content>
                  <div class="monsterCanvas">
                     <MonsterHunt :monster-data="monster" />
                  </div>
                  <div class="monsterBadge">
                     {{ monster.name }}
                  </div>
                  <div class="monsterLoot"></div>
                  <div class="controller">
                     <v-btn
                        v-if="canAcessLevel(group)"
                        class="deep-orange accent-4 white--text"
                        @click="sendToMap(monster)"
                     >
                        <v-icon left>mdi-sword</v-icon> Fight
                     </v-btn>
                  </div>
               </template>
            </CardBody>
         </div>
      </div>
   </div>
</template>

<script>
import { mapState } from "vuex";
import CardBody from "@/shared/components/AD/atoms/CardBody.vue";
import MonsterHunt from "@/views/Hunt/shared/AD/atoms/MonsterHunt.vue";

export default {
   name: "normalLevelGrid",
   components: {
      CardBody,
      MonsterHunt,
   },
   computed: {
      ...mapState({
         huntLevels: (store) => store.Hunt.huntLevels,
      }),

      groupLevel() {
         return (group) => {
            let keyName = null;

            for (let hunt in this.huntLevels) {
               if (this.huntLevels[hunt] == group) {
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
      sendToMap(monster) {
         this.$router
            .push({
               name: "HuntingGround",
               params: { hunt: monster.relatedId },
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
