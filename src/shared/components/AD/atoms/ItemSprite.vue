<template>
   <div id="itemSprite">
      <v-tooltip
         bottom
         color="deep-purple darken-4"
         transition="slide-y-reverse-transition"
      >
         <template v-slot:activator="{ on, attrs }">
            <figure v-bind="attrs" v-on="on" :tier="sprite.tier">
               <img :src="spriteLink" :alt="sprite.name" />
            </figure>
         </template>
         <span>
            <div class="itemStats" tooltip>
               <div class="containerHeader">
                  <strong class="itemTitle">{{ sprite.name }}</strong>
                  <small
                     :class="persona.level >= minItemLevel ? 'can' : 'blocked'"
                     >Min level: {{ minItemLevel }}</small
                  >
               </div>
               <ul>
                  <li>
                     <strong>STR:</strong>
                     <span>{{ stats(sprite.attr.str) }}</span>
                  </li>
                  <li>
                     <strong>DEF:</strong>
                     <span>{{ stats(sprite.attr.armor) }}</span>
                  </li>
                  <li>
                     <strong>VIT:</strong>
                     <span>{{ stats(sprite.attr.vit) }}</span>
                  </li>
                  <li>
                     <strong>AGI:</strong>
                     <span>{{ stats(sprite.attr.agi) }}</span>
                  </li>
                  <li>
                     <strong>DEX:</strong>
                     <span>{{ stats(sprite.attr.dex) }}</span>
                  </li>
                  <li>
                     <strong>LUK:</strong>
                     <span>{{ stats(sprite.attr.luk) }}</span>
                  </li>
               </ul>
               <ul v-if="attackRange(sprite) || lifeSteal(sprite)">
                  <li v-if="lifeSteal(sprite)">
                     <strong>Life Steal:</strong>
                     <span>{{ stats(lifeSteal(sprite)) }}%</span>
                  </li>
                  <li v-if="attackRange(sprite)">
                     <strong>Extra Range:</strong>
                     <span>{{ stats(attackRange(sprite)) }}</span>
                  </li>
               </ul>
               <div class="vocationRequired" v-if="sprite.vocationRequired">
                  <strong>Vocation required: </strong
                  >{{ vocationsCanUseItem(sprite) }}
               </div>
               <div class="price">
                  <strong>Gold: </strong>
                  <span>{{ stats(itemValue(sprite)).toLocaleString() }}</span>
               </div>
            </div>
         </span>
      </v-tooltip>
   </div>
</template>

<script>
import itemValueIdentifier from "@/shared/utils/itemValueIdentifier.js";
import levelRestriction from "@/shared/utils/levelRestriction.js";
import "@/shared/scss/_itemSprite.scss";
import { mapGetters } from "vuex";

export default {
   name: "ItemSprite",
   computed: {
      ...mapGetters(["persona"]),

      spriteLink() {
         const API_SERVER = process.env.VUE_APP_PUBLIC;

         return API_SERVER + this.sprite.sprite;
      },
      stats() {
         return (value) => {
            return value ?? 0;
         };
      },
      attackRange() {
         return (item) => item.misc?.attackRange || 0;
      },
      lifeSteal() {
         return (item) => item.misc?.lifeSteal || 0;
      },
      itemValue() {
         return (item) => {
            if (this.inStore) {
               return itemValueIdentifier.buying(
                  item.gold,
                  item.tier,
                  this.persona.honor ?? 0
               );
            } else {
               return itemValueIdentifier.selling(
                  item.gold,
                  item.tier,
                  this.persona.honor ?? 0
               );
            }
         };
      },
      minItemLevel() {
         let level = 1;
         let hasLevel = levelRestriction;

         while (hasLevel(level, this.sprite.tier)) {
            level++;
         }
         return level;
      },
      vocationsCanUseItem() {
         return (item) => {
            if (item.vocationRequired) {
               let vocations = "";
               for (let vocation in item.vocationRequired) {
                  vocations += `${item.vocationRequired[vocation]}, `;
               }
               return vocations.slice(0, vocations.length - 2);
            }
         };
      },
   },
   props: {
      sprite: {
         type: Object,
         required: true,
      },
      orientation: {
         type: String,
         default: "top",
      },
      "in-store": {
         type: Boolean,
         default: false,
      },
   },
};
</script>
