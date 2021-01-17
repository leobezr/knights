<template>
  <div id="gearSprite">
    <ul>
      <li v-for="(sprite, index) in spriteList" :key="index">
        <ItemSprite :sprite="sprite" />
      </li>
    </ul>
  </div>
</template>

<script>
import ItemSprite from "@/shared/components/AD/atoms/ItemSprite.vue";

export default {
  name: "GearSprite",
  components: {
    ItemSprite,
  },
  props: {
    "sprite-list": {
      type: Array,
      required: true,
    },
  },
};
</script>