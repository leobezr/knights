<template>
   <div id="characterEquip">
      <div class="characterHead">
         <ul>
            <li @contextmenu="(e) => unequip(e, equips.headgear_top, 'headgear_top')">
               <ItemSprite
                  :sprite="equips.headgear_top"
                  v-if="equips.headgear_top"
               />
               <span class="slot" v-else></span>
            </li>
            <li @contextmenu="(e) => unequip(e, equips.headgear_middle, 'headgear_middle')">
               <ItemSprite
                  :sprite="equips.headgear_middle"
                  v-if="equips.headgear_middle"
               />
               <span class="slot" v-else></span>
            </li>
            <li @contextmenu="(e) => unequip(e, equips.headgear_lower, 'headgear_lower')">
               <ItemSprite
                  :sprite="equips.headgear_lower"
                  v-if="equips.headgear_lower"
               />
               <span class="slot" v-else></span>
            </li>
         </ul>
      </div>
      <div class="characterMiddle">
         <ul>
            <li @contextmenu="(e) => unequip(e, equips.weapon, 'weapon')">
               <ItemSprite :sprite="equips.weapon" v-if="equips.weapon" />
               <span class="slot" v-else></span>
            </li>
            <li @contextmenu="(e) => unequip(e, equips.armor, 'armor')">
               <ItemSprite :sprite="equips.armor" v-if="equips.armor" />
               <span class="slot" v-else></span>
            </li>
            <li @contextmenu="(e) => unequip(e, equips.shield, 'shield')">
               <ItemSprite :sprite="equips.shield" v-if="equips.shield" />
               <span class="slot" v-else></span>
            </li>
         </ul>
      </div>
      <div class="characterFoot">
         <ul>
            <li @contextmenu="(e) => unequip(e, equips.footgear, 'footgear')">
               <ItemSprite :sprite="equips.footgear" v-if="equips.footgear" />
               <span class="slot" v-else></span>
            </li>
         </ul>
      </div>
      <div class="characterMisc">
         <ul>
            <li @contextmenu="(e) => unequip(e, equips.accessory_1, 'accessory_1')">
               <ItemSprite
                  :sprite="equips.accessory_1"
                  v-if="equips.accessory_1"
               />
               <span class="slot" v-else></span>
            </li>
            <li @contextmenu="(e) => unequip(e, equips.accessory_2, 'accessory_2')">
               <ItemSprite
                  :sprite="equips.accessory_2"
                  v-if="equips.accessory_2"
               />
               <span class="slot" v-else></span>
            </li>
            <li @contextmenu="(e) => unequip(e, equips.accessory_3, 'accessory_3')">
               <ItemSprite
                  :sprite="equips.accessory_3"
                  v-if="equips.accessory_3"
               />
               <span class="slot" v-else></span>
            </li>
            <li @contextmenu="(e) => unequip(e, equips.accessory_4, 'accessory_4')">
               <ItemSprite
                  :sprite="equips.accessory_4"
                  v-if="equips.accessory_4"
               />
               <span class="slot" v-else></span>
            </li>
         </ul>
      </div>
   </div>
</template>

<script>
import ItemSprite from "@/shared/components/AD/atoms/ItemSprite.vue";
import { mapActions, mapGetters } from "vuex";

export default {
   name: "CharacterEquip",
   data() {
      return {
         user: null,
      };
   },
   components: {
      ItemSprite,
   },
   computed: {
      ...mapGetters(["persona"]),

      equips() {
         if (this.user) {
            return this.user.equipped ?? false;
         }
         return false;
      },
   },
   methods: {
      ...mapActions(["unequipItem"]),

      unequip(e, item, slot) {
         e.preventDefault();

         if (item && slot) {
            this.unequipItem({ item, slot });
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
