<template>
   <div id="characterInventory">
      <ul>
         <v-menu top offset-y v-for="(item, index) in inventory" :key="index">
            <template v-slot:activator="{ on, attrs }">
               <li
                  v-bind="attrs"
                  v-on="on"
                  :disabled="itemStateLoading"
                  @contextmenu="(e) => equip(e, item)"
               >
                  <ItemSprite :sprite="item" />
               </li>
            </template>

            <v-list dark class="deep-purple darken-4">
               <v-list-item link @click="(e) => equip(e, item)">
                  <v-list-item-title>
                     <v-icon left color="primary"
                        >mdi-bag-personal-outline</v-icon
                     >
                     Equip item
                  </v-list-item-title>
               </v-list-item>
               <v-list-item link @click="discardItem(item)">
                  <v-list-item-title>
                     <v-icon left color="primary">mdi-delete-outline</v-icon>
                     Throw away
                  </v-list-item-title>
               </v-list-item>
            </v-list>
         </v-menu>
      </ul>
   </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import levelRestriction from "@/shared/utils/levelRestriction.js";
import ItemSprite from "@/shared/components/AD/atoms/ItemSprite.vue";

export default {
   name: "CharacterInventory",
   data() {
      return {
         itemStateLoading: false,
      };
   },
   components: {
      ItemSprite,
   },
   computed: {
      ...mapGetters(["persona"]),

      inventory() {
         if (this.persona) {
            return this.persona.inventory ?? [];
         }
      },
   },
   methods: {
      ...mapActions(["equipItem", "discardInventoryItem"]),

      equip(e, item) {
         e.preventDefault();

         if (!levelRestriction(this.persona.level, item.tier)) {
            this.itemStateLoading = true;

            this.equipItem(item)
               .catch((e) => {})
               .finally(() => (this.itemStateLoading = false));
         }
      },
      discardItem(item) {
         this.itemStateLoading = true;

         this.discardInventoryItem(item)
            .catch((e) => {})
            .finally(() => (this.itemStateLoading = false));
      },
   },
};
</script>
