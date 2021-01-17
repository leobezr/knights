<template>
  <div id="characterInventory">
    <ul>
      <li v-for="(item, index) in inventory" :key="index">
        <ItemSprite :sprite="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ItemSprite from "@/shared/components/AD/atoms/ItemSprite.vue";

export default {
  name: "CharacterInventory",
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
};
</script>