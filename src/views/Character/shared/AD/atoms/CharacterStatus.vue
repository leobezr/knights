<template>
   <div id="characterStatus" class="mt-3">
      <strong>Character Status</strong>

      <div class="table-grid mt-2" v-if="attribute">
         <div class="table-stats">
            <div class="line">
               <strong>HIT</strong>
               <span>{{ attribute.hit }}</span>
            </div>
            <div class="line">
               <strong>DEF</strong>
               <span>{{ attribute.def }} </span>
            </div>
            <div class="line">
               <strong>HP</strong>
               <span>{{ attribute.hp.toLocaleString() }}</span>
            </div>
         </div>

         <div class="table-stats">
            <div class="line">
               <strong>STR</strong>
               <span>
                  <v-btn
                     v-if="pointsToAdd && attrBellowMaxStatus('str')"
                     icon
                     @click="addStatus('str')"
                     color="primary"
                     small
                     class="mr-1"
                  >
                     <v-icon small dark>mdi-plus</v-icon>
                  </v-btn>
                  <span class="points">{{ attribute.str }}</span>
                  <ModifierStats stats="str" :attr="mod" />
               </span>
            </div>
            <div class="line">
               <strong>VIT</strong>
               <span>
                  <v-btn
                     v-if="pointsToAdd && attrBellowMaxStatus('vit')"
                     icon
                     @click="addStatus('vit')"
                     color="primary"
                     small
                     class="mr-1"
                  >
                     <v-icon small dark>mdi-plus</v-icon>
                  </v-btn>
                  <span class="points">{{ attribute.vit }}</span>
                  <ModifierStats stats="vit" :attr="mod" />
               </span>
            </div>
            <div class="line">
               <strong>AGI</strong>
               <span>
                  <v-btn
                     v-if="pointsToAdd && attrBellowMaxStatus('agi')"
                     icon
                     @click="addStatus('agi')"
                     color="primary"
                     small
                     class="mr-1"
                  >
                     <v-icon small dark>mdi-plus</v-icon>
                  </v-btn>
                  <span class="points">{{ attribute.agi }}</span>
                  <ModifierStats stats="agi" :attr="mod" />
               </span>
            </div>
            <div class="line">
               <strong>LUK</strong>
               <span>
                  <v-btn
                     v-if="pointsToAdd && attrBellowMaxStatus('luk')"
                     icon
                     @click="addStatus('luk')"
                     color="primary"
                     small
                     class="mr-1"
                  >
                     <v-icon small dark>mdi-plus</v-icon>
                  </v-btn>
                  <span class="points">{{ attribute.luk }}</span>
                  <ModifierStats stats="luk" :attr="mod" />
               </span>
            </div>
            <div class="line">
               <strong>DEX</strong>
               <span>
                  <v-btn
                     v-if="pointsToAdd && attrBellowMaxStatus('dex')"
                     icon
                     @click="addStatus('dex')"
                     color="primary"
                     small
                     class="mr-1"
                  >
                     <v-icon small dark>mdi-plus</v-icon>
                  </v-btn>
                  <span class="points">{{ attribute.dex }}</span>
                  <ModifierStats stats="dex" :attr="mod" />
               </span>
            </div>
         </div>
         <div class="table-stats">
            <div class="line flex-column">
               <div class="d-flex justify-space-between w-100">
                  <strong>Character Power</strong>
                  <span> {{ attribute.cp }} </span>
               </div>
               <div class="d-flex justify-space-between w-100">
                  <strong>Attack Range</strong>
                  <span> {{ characterRange }} </span>
               </div>
               <div
                  class="d-flex justify-space-between w-100"
                  v-if="pointsToAdd"
               >
                  <strong>Status Points Available</strong>
                  <span> {{ pointsToAdd }} </span>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ModifierStats from "@/views/Character/shared/AD/atoms/ModifierStats.vue";

export default {
   name: "CharacterStatus",
   components: {
      ModifierStats,
   },
   data() {
      return {
         user: null,
      };
   },
   computed: {
      ...mapGetters(["persona"]),

      attribute() {
         return this.user?.attributes ?? {};
      },
      mod() {
         return this.user.modifier;
      },
      pointsToAdd() {
         const GAIN_STATUS_PER_LEVEL = 5;
         let { str, agi, vit, luk, dex } = this.user.attributes;
         let attr = { str, agi, vit, luk, dex };

         let statusPoints = -50;

         for (let value in attr) {
            let val = parseFloat(attr[value]) || 0;

            statusPoints += val;
         }

         let hasPoints = Math.round(
            Math.abs(statusPoints - this.user.level * GAIN_STATUS_PER_LEVEL)
         );
         return hasPoints;
      },
      characterRange() {
         return this.user.misc.attackRange;
      },
      attrBellowMaxStatus() {
         const MAX_STATUS_POINTS = 200;

         return (statusKey) => {
            if (this.user.attributes) {
               return this.user.attributes[statusKey] < MAX_STATUS_POINTS;
            } else {
               false;
            }
         };
      },
   },
   methods: {
      ...mapActions(["addPoint"]),

      async addStatus(status) {
         if (this.pointsToAdd) {
            await this.addPoint(status);
         }
      },
   },
   watch: {
      persona: {
         handler() {
            this.user = this.persona;
         },
         deep: true,
      },
   },
   created() {
      this.user = { ...this.persona };
   },
};
</script>
