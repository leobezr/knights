<template>
   <div id="characterEquip">
      <div class="characterHead">
         <ul>
            <li
               @contextmenu="
                  (e) => unequip(e, equips['headgear-top'], 'headgear-top')
               "
            >
               <ItemSprite
                  :sprite="equips['headgear-top']"
                  v-if="equips['headgear-top']"
               />
               <span class="slot" v-else></span>
            </li>
            <li
               @contextmenu="
                  (e) =>
                     unequip(e, equips['headgear-middle'], 'headgear-middle')
               "
            >
               <ItemSprite
                  :sprite="equips['headgear-middle']"
                  v-if="equips['headgear-middle']"
               />
               <span class="slot" v-else></span>
            </li>
            <li
               @contextmenu="
                  (e) => unequip(e, equips['headgear-lower'], 'headgear-lower')
               "
            >
               <ItemSprite
                  :sprite="equips['headgear-lower']"
                  v-if="equips['headgear-lower']"
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
      <div class="characterLowerCenter">
         <ul>
            <li @contextmenu="(e) => unequip(e, equips.legs, 'legs')">
               <ItemSprite :sprite="equips.legs" v-if="equips.legs" />
               <span class="slot" v-else></span>
            </li>
         </ul>
      </div>
      <div class="characterBottom">
         <ul>
            <li
               @contextmenu="(e) => unequip(e, equips.decoration, 'decoration')"
            >
               <ItemSprite
                  :sprite="equips.decoration"
                  v-if="equips.decoration"
               />
               <span class="slot" v-else></span>
            </li>
            <li @contextmenu="(e) => unequip(e, equips.footgear, 'footgear')">
               <ItemSprite :sprite="equips.footgear" v-if="equips.footgear" />
               <span class="slot" v-else></span>
            </li>
            <li @contextmenu="(e) => unequip(e, equips.ammo, 'ammo')">
               <ItemSprite :sprite="equips.ammo" v-if="equips.ammo" />
               <span class="slot" v-else></span>
            </li>
         </ul>
      </div>
      <div class="characterMisc">
         <ul>
            <li
               @contextmenu="
                  (e) => unequip(e, equips.accessory_1, 'accessory_1')
               "
            >
               <ItemSprite
                  :sprite="equips.accessory_1"
                  v-if="equips.accessory_1"
               />
               <span class="slot" v-else></span>
            </li>
            <li
               @contextmenu="
                  (e) => unequip(e, equips.accessory_2, 'accessory_2')
               "
            >
               <ItemSprite
                  :sprite="equips.accessory_2"
                  v-if="equips.accessory_2"
               />
               <span class="slot" v-else></span>
            </li>
            <li
               @contextmenu="
                  (e) => unequip(e, equips.accessory_3, 'accessory_3')
               "
            >
               <ItemSprite
                  :sprite="equips.accessory_3"
                  v-if="equips.accessory_3"
               />
               <span class="slot" v-else></span>
            </li>
            <li
               @contextmenu="
                  (e) => unequip(e, equips.accessory_4, 'accessory_4')
               "
            >
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
            if (!this.blockEquipInteraction) {
               this.unequipItem({ item, slot });
            }
         }
      },
   },
   props: {
      "block-equip-interaction": {
         type: Boolean,
         default: false,
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
