<template>
   <div id="store">
      <div class="landscape" :style="backgroundImage">
         <div class="storeHolder pt-2">
            <div class="storeContainer">
               <CardBody title="Store">
                  <template v-slot:content>
                     <StoreItems />
                  </template>
               </CardBody>
            </div>
            <div class="rightContainerWrapper">
               <div class="upperContainer">
                  <div class="characterItemsContainer">
                     <CardBody title="Items">
                        <template v-slot:content>
                           <CharacterItems block-equip-interaction />
                        </template>
                     </CardBody>
                  </div>
                  <div class="chestContainer">
                     <CardBody title="Chest">
                        <template v-slot:content>
                           <CharacterChest />
                        </template>
                     </CardBody>
                  </div>
               </div>
               <div class="inventoryContainer">
                  <CardBody custom-title>
                     <template v-slot:custom-title>
                        <div
                           class="card-header d-flex flex-direction-row justify-space-between"
                        >
                           <h3>Inventory</h3>
                           <v-btn @click="sellInventory" color="primary"
                              >Sell all</v-btn
                           >
                        </div>
                     </template>
                     <template v-slot:content>
                        <StoreInventory
                           id="knightGear"
                           class="inventory mt-1"
                        />
                        <GoldPlaceholder class="d-block w-100 mt-10" />
                     </template>
                  </CardBody>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import bgImage from "@/shared/img/store-background.jpg";
import CardBody from "@/shared/components/AD/atoms/CardBody.vue";
import StoreInventory from "@/views/Store/shared/AD/atoms/StoreInventory.vue";
import GoldPlaceholder from "@/views/Character/shared/AD/atoms/GoldPlaceholder.vue";
import StoreItems from "@/views/Store/shared/AD/molecules/StoreItems.vue";
import CharacterItems from "@/views/Character/shared/AD/atoms/CharacterEquip.vue";
import CharacterChest from "@/views/Character/shared/AD/molecules/CharacterChest.vue";
import SoundEffect from "@/views/HuntingGround/shared/utils/soundEffects.js";
import { shop } from "@/shared/utils/soundPack.js";
import "@/views/Store/shared/scss/_store.scss";

export default {
   name: "Store",
   components: {
      CardBody,
      StoreInventory,
      GoldPlaceholder,
      StoreItems,
      CharacterItems,
      CharacterChest,
   },
   computed: {
      ...mapGetters(["persona"]),

      backgroundImage() {
         return `background-image: url(${bgImage});`;
      },
   },
   methods: {
      ...mapActions(["me", "sellAllInventory"]),

      init() {
         this.me();
      },
      playSound() {
         const sellSound = new SoundEffect(shop.sellItem);

         sellSound.play();
      },
      sellInventory() {
         if (this.persona?.inventory?.length) {
            this.sellAllInventory();
            this.playSound();
         }
      },
   },
   created() {
      this.init();
   },
};
</script>
