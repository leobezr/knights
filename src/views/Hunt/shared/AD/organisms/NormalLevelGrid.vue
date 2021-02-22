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
                  <v-tooltip bottom color="secondary">
                     <template v-slot:activator="{ on, attrs }">
                        <div class="controller" v-bind="attrs" v-on="on">
                           <v-btn
                              v-if="canAcessLevel(group)"
                              :disabled="!hasLevelFor(monster.level).result"
                              :loading="playerGeneratedBattle"
                              class="deep-orange accent-4 white--text"
                              @click="battle(monster)"
                           >
                              <v-icon left>mdi-sword</v-icon> Fight
                           </v-btn>
                        </div>
                     </template>
                     <span
                        >Min Lv. {{ hasLevelFor(monster.level).minLevel }}</span
                     >
                  </v-tooltip>
               </template>
            </CardBody>
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CardBody from "@/shared/components/AD/atoms/CardBody.vue";
import MonsterHunt from "@/views/Hunt/shared/AD/atoms/MonsterHunt.vue";
import partyRules from "@/rules/partyRules.js";

export default {
   name: "normalLevelGrid",
   data() {
      return {
         playerGeneratedBattle: false,
         party: [],
      };
   },
   components: {
      CardBody,
      MonsterHunt,
   },
   computed: {
      ...mapState({
         huntLevels: (store) => store.Hunt.huntLevels,
         persona: (store) => store.Knights.persona,
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
            if (this.persona) {
               let permission = this.persona.unlocked.hunt;
               let level = this.groupLevel(group);

               return permission.includes(level);
            }
            return false;
         };
      },
      hasLevelFor() {
         return (huntLevel) => {
            let allMembersAreEligible = false;
            let party = this.party?.members;

            if (party && party.length) {
               for (let member in party) {
                  member = party[member];
                  let hasLevel = partyRules.canHuntMonster(
                     member.level,
                     huntLevel
                  ).result;

                  if (!hasLevel) {
                     allMembersAreEligible = false;
                     break;
                  } else {
                     allMembersAreEligible = true;
                  }
               }
            }
            return {
               result: allMembersAreEligible,
               minLevel: partyRules.canHuntMonster(
                  this.persona?.level,
                  huntLevel
               ).minLevel,
            };
         };
      },
   },
   methods: {
      ...mapActions(["generateBattleSession"]),

      async battle(monster) {
         this.playerGeneratedBattle = true;
         this.$socket.emit("battleGenerated", this.persona);

         await this.generateBattleSession(monster.relatedId);

         this.playerGeneratedBattle = false;
      },
   },
   sockets: {
      partyMembers(members) {
         this.party = members;
      },
   },
};
</script>
