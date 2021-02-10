<template>
   <div class="contentGrid">
      <div class="groupLevel" v-for="(group, i) of monsterLevels" :key="i">
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
            <CardBody v-for="(monster, index) in group" :key="index">
               <template v-slot:content>
                  <div class="monsterCanvas">
                     <MonsterHunt :monster-data="monster" />
                  </div>
                  <div class="monsterBadge">
                     {{ monster.label }}
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
import Hunts from "@/views/Hunt/shared/hunts";
import CardBody from "@/shared/components/AD/atoms/CardBody.vue";
import MonsterHunt from "@/views/Hunt/shared/AD/atoms/MonsterHunt.vue";

export default {
   name: "normalLevelGrid",
   data() {
      return {
         monsterList: Hunts,
      };
   },
   components: {
      CardBody,
      MonsterHunt,
   },
   computed: {
      monsterLevels() {
         return this.monsterList.normalLevel;
      },
      groupLevel() {
         return (group) => {
            let keyIndex = 0;
            let getValue = (v) => Object.values(v);

            for (let i = 0; i < getValue(this.monsterLevels).length; i++) {
               if (getValue(this.monsterLevels)[i] == group) {
                  keyIndex = i;
                  break;
               }
            }
            return Object.keys(this.monsterLevels)[keyIndex];
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
               params: { hunt: monster.name.toLowerCase() },
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
