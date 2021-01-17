<template>
  <div id="itemSprite">
    <v-tooltip top color="deep-purple accent-4" transition="slide-y-reverse-transition">
      <template v-slot:activator="{ on, attrs }">
        <figure v-bind="attrs" v-on="on" :tier="sprite.tier">
          <img :src="spriteLink" :alt="sprite.name" />
        </figure>
      </template>
      <span>
        <div class="itemStats" tooltip>
          <strong class="itemTitle">{{ sprite.name }}</strong>
          <ul>
            <li>
              <strong>STR:</strong>
              <span>{{ stats(sprite.attr.str) }}</span>
            </li>
            <li>
              <strong>DEF:</strong>
              <span>{{ stats(sprite.attr.armor) }}</span>
            </li>
            <li>
              <strong>VIT:</strong>
              <span>{{ stats(sprite.attr.vit) }}</span>
            </li>
            <li>
              <strong>AGI:</strong>
              <span>{{ stats(sprite.attr.agi) }}</span>
            </li>
            <li>
              <strong>LUK:</strong>
              <span>{{ stats(sprite.attr.luk) }}</span>
            </li>
          </ul>
        </div>
      </span>
    </v-tooltip>
  </div>
</template>

<script>
import "@/shared/scss/_itemSprite.scss";

export default {
  name: "ItemSprite",
  computed: {
    spriteLink() {
      const API_SERVER = process.env.VUE_APP_PUBLIC;

      return API_SERVER + this.sprite.sprite;
    },
    stats() {
      return (value) => {
        return value ?? 0;
      };
    },
  },
  props: {
    sprite: {
      type: Object,
      required: true,
    },
  },
};
</script>
