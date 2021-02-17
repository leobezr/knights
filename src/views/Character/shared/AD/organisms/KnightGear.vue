<template>
   <div id="knightGear" class="inventory">
      <CardBody title="Chat" index="2" class="socket">
         <template v-slot:content>
            <Chat />
         </template>
      </CardBody>
      <CardBody title="Inventory" index="2">
         <template v-slot:content>
            <CharacterInventory />
         </template>
      </CardBody>
      <!-- <CardBody title="Chest" index="2">
         <template v-slot:content>
            <CharacterChest />
         </template>
      </CardBody> -->
   </div>
</template>

<script>
import CardBody from "@/shared/components/AD/atoms/CardBody.vue";
import CharacterInventory from "@/views/Character/shared/AD/molecules/CharacterInventory.vue";
import Chat from "@/shared/components/AD/organisms/Chat.vue";
import CharacterChest from "@/views/Character/shared/AD/molecules/CharacterChest.vue";
import "@/shared/scss/_knightGearInventory.scss";

export default {
   name: "KnightGear",
   components: {
      CardBody,
      CharacterInventory,
      CharacterChest,
      Chat
   },
};
</script>
