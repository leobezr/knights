<template>
   <div id="characterEquip">
      <div class="characterHead">
         <ul>
            <li>
               <ItemSprite
                  :sprite="equips.headgear_top"
                  v-if="equips.headgear_top"
               />
               <span class="slot" v-else></span>
            </li>
            <li>
               <ItemSprite
                  :sprite="equips.headgear_middle"
                  v-if="equips.headgear_middle"
               />
               <span class="slot" v-else></span>
            </li>
            <li>
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
            <li>
               <ItemSprite :sprite="equips.weapon" v-if="equips.weapon" />
               <span class="slot" v-else></span>
            </li>
            <li>
               <ItemSprite :sprite="equips.armor" v-if="equips.armor" />
               <span class="slot" v-else></span>
            </li>
            <li>
               <ItemSprite :sprite="equips.shield" v-if="equips.shield" />
               <span class="slot" v-else></span>
            </li>
         </ul>
      </div>
      <div class="characterFoot">
         <ul>
            <li>
               <ItemSprite :sprite="equips.footgear" v-if="equips.footgear" />
               <span class="slot" v-else></span>
            </li>
         </ul>
      </div>
      <div class="characterMisc">
         <ul>
            <li>
               <ItemSprite
                  :sprite="equips.accessory_1"
                  v-if="equips.accessory_1"
               />
               <span class="slot" v-else></span>
            </li>
            <li>
               <ItemSprite
                  :sprite="equips.accessory_2"
                  v-if="equips.accessory_2"
               />
               <span class="slot" v-else></span>
            </li>
            <li>
               <ItemSprite
                  :sprite="equips.accessory_3"
                  v-if="equips.accessory_3"
               />
               <span class="slot" v-else></span>
            </li>
            <li>
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
import { mapGetters } from "vuex";

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
   created() {
      this.user = { ...this.persona };
   },
};
</script>
