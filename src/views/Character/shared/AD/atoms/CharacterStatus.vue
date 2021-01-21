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
               <strong>ATK</strong>
               <span>{{ attribute.atk }}</span>
            </div>
            <div class="line">
               <strong>DEF</strong>
               <span
                  >{{ attribute.def }}
                  <ModifierStats stats="armor" :attr="mod" />
               </span>
            </div>
            <div class="line">
               <strong>HP</strong>
               <span>{{
                  `${attribute.hp.value} / ${attribute.hp.total}`
               }}</span>
            </div>
         </div>

         <div class="table-stats">
            <div class="line">
               <strong>STR</strong>
               <span
                  >{{ attribute.str }}
                  <ModifierStats stats="str" :attr="mod" />
               </span>
            </div>
            <div class="line">
               <strong>VIT</strong>
               <span
                  >{{ attribute.vit }}
                  <ModifierStats stats="vit" :attr="mod" />
               </span>
            </div>
            <div class="line">
               <strong>AGI</strong>
               <span
                  >{{ attribute.agi }}
                  <ModifierStats stats="agi" :attr="mod" />
               </span>
            </div>
            <div class="line">
               <strong>LUK</strong>
               <span
                  >{{ attribute.luk }}
                  <ModifierStats stats="luk" :attr="mod" />
               </span>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapGetters } from "vuex";
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
