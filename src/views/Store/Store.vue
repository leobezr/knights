<template>
   <div id="store">
      <div class="landscape" :style="backgroundImage">
         <div class="storeHolder pt-2">
            <div class="storeContainer">
               <CardBody title="Store">
                  <StoreItems />
               </CardBody>
            </div>
            <div class="inventoryContainer">
               <CardBody title="Inventory">
                  <StoreInventory id="knightGear" class="inventory mt-1" />
                  <GoldPlaceholder class="d-block w-100 mt-10" />
               </CardBody>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions } from "vuex";
import bgImage from "@/shared/img/store-background.jpg";
import CardBody from "@/shared/components/AD/atoms/CardBody.vue";
import StoreInventory from "@/views/Store/shared/AD/atoms/StoreInventory.vue";
import GoldPlaceholder from "@/views/Character/shared/AD/atoms/GoldPlaceholder.vue";
import StoreItems from "@/views/Store/shared/AD/molecules/StoreItems.vue";
import "@/views/Store/shared/scss/_store.scss";

export default {
   name: "Store",
   computed: {
      backgroundImage() {
         return `background-image: url(${bgImage});`;
      },
   },
   components: {
      CardBody,
      StoreInventory,
      GoldPlaceholder,
      StoreItems
   },
   methods: {
      ...mapActions(["me"]),

      init() {
         this.me();
      },
   },
   created() {
      this.init();
   },
};
</script>
