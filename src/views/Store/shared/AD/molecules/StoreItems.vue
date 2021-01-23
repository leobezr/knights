<template>
   <div id="storeItems">
      <div class="headgears" v-if="headgears">
         <h3>Headgears</h3>
         <ul>
            <li v-for="(item, index) in headgears" :key="index">
               <SmallMenu :config="menuConfig(item)" :disabled="levelRestriction(persona.level, item.tier)">
                  <template v-slot:content>
                     <ItemSprite :sprite="item" in-store />
                  </template>
               </SmallMenu>
            </li>
         </ul>
         <h3>Armor</h3>
         <ul>
            <li v-for="(item, index) in armor" :key="index">
               <SmallMenu :config="menuConfig(item)" :disabled="levelRestriction(persona.level, item.tier)">
                  <template v-slot:content>
                     <ItemSprite :sprite="item" in-store />
                  </template>
               </SmallMenu>
            </li>
         </ul>
         <h3>Acessories</h3>
         <ul>
            <li v-for="(item, index) in accessories" :key="index">
               <SmallMenu :config="menuConfig(item)" :disabled="levelRestriction(persona.level, item.tier)">
                  <template v-slot:content>
                     <ItemSprite :sprite="item" in-store />
                  </template>
               </SmallMenu>
            </li>
         </ul>
         <h3>Footgear</h3>
         <ul>
            <li v-for="(item, index) in footgear" :key="index">
               <SmallMenu :config="menuConfig(item)" :disabled="levelRestriction(persona.level, item.tier)">
                  <template v-slot:content>
                     <ItemSprite :sprite="item" in-store />
                  </template>
               </SmallMenu>
            </li>
         </ul>
         <h3>Legs</h3>
         <ul>
            <li v-for="(item, index) in legs" :key="index">
               <SmallMenu :config="menuConfig(item)" :disabled="levelRestriction(persona.level, item.tier)">
                  <template v-slot:content>
                     <ItemSprite :sprite="item" in-store />
                  </template>
               </SmallMenu>
            </li>
         </ul>
         <h3>Sheilds</h3>
         <ul>
            <li v-for="(item, index) in shields" :key="index">
               <SmallMenu :config="menuConfig(item)" :disabled="levelRestriction(persona.level, item.tier)">
                  <template v-slot:content>
                     <ItemSprite :sprite="item" in-store />
                  </template>
               </SmallMenu>
            </li>
         </ul>
         <h3>Weapons</h3>
         <ul>
            <li v-for="(item, index) in weapons" :key="index">
               <SmallMenu :config="menuConfig(item)" :disabled="levelRestriction(persona.level, item.tier)">
                  <template v-slot:content>
                     <ItemSprite :sprite="item" in-store />
                  </template>
               </SmallMenu>
            </li>
         </ul>
      </div>
   </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import ItemSprite from "@/shared/components/AD/atoms/ItemSprite.vue";
import SmallMenu from "@/shared/components/AD/atoms/SmallMenu.vue";
import levelRestriction from "@/shared/utils/levelRestriction.js";

export default {
   name: "StoreItem",
   components: {
      ItemSprite,
      SmallMenu,
   },
   data() {
      return {
         list: null,
      };
   },
   computed: {
      ...mapGetters(["persona"]),
      ...mapState({
         gallery: (state) => state.Items.gallery,
      }),

      levelRestriction: () => levelRestriction,

      galleryList() {
         let list = [];
         let { _id, ...gallery } = this.gallery;

         for (let key in gallery) {
            list.push(...gallery[key]);
         }

         return list ? list : false;
      },

      headgears() {
         return this.filter("headgear");
      },
      accessories() {
         return this.filter("accessories");
      },
      armor() {
         return this.filter("armor");
      },
      footgear() {
         return this.filter("footgear");
      },
      legs() {
         return this.filter("legs");
      },
      shields() {
         return this.filter("shields");
      },
      weapons() {
         return this.filter("weapons");
      },

      menuConfig() {
         return (item) => {
            return {
               repeat: [
                  {
                     label: "Buy item",
                     action: () => this.buyItem(item),
                     icon: "mdi-currency-usd",
                  },
               ],
            };
         };
      },
   },
   methods: {
      ...mapActions(["getItemsGallery", "buyItemFromStore"]),

      filter(key) {
         if (this.galleryList) {
            const ITEM_LIST = this.galleryList.filter((item) => {
               return item.sprite.includes(key);
            });

            if (ITEM_LIST && ITEM_LIST.length) {
               return ITEM_LIST;
            }
            return false;
         }
      },
      getItems() {
         this.getItemsGallery();
      },
      buyItem(item) {
         this.buyItemFromStore(item);
      }
   },
   created() {
      this.getItems();
   },
};
</script>
