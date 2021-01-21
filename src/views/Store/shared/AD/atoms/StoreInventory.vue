<template>
   <div id="characterInventory">
      <ul>
         <v-menu top offset-y v-for="(item, index) in inventory" :key="index">
            <template v-slot:activator="{ on, attrs }">
               <li
                  v-bind="attrs"
                  v-on="on"
                  @contextmenu="(e) => disabledContext(e)"
               >
                  <ItemSprite :sprite="item" />
               </li>
            </template>

            <v-list dark class="deep-purple darken-4">
               <v-list-item link @click="sell(item)">
                  <v-list-item-title>
                     <v-icon left color="primary">mdi-currency-usd</v-icon>
                     Sell item
                  </v-list-item-title>
               </v-list-item>
            </v-list>
         </v-menu>
      </ul>
   </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
      ...mapActions(["sellInventoryItem"]),

      disabledContext(e) {
         e.preventDefault();
      },
      sell(item) {
         if (this.persona.inventory.includes(item)) {
            this.sellInventoryItem(item);
         }
      },
   },
};
</script>
