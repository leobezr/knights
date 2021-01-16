<template>
  <div id="sprite">
    <figure :size="size">
      <img :src="characterSprite" :alt="characterName"/>
    </figure>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import femaleSprites from "@/views/KnightBuilder/sprite/female/femaleExport.js";
import maleSprites from "@/views/KnightBuilder/sprite/male/maleExport.js";

import "@/shared/scss/_sprite.scss";

export default {
  name: "Sprite",
  data() {
    return {
      characterData: null,
    };
  },
  computed: {
    ...mapGetters(["persona"]),

    characterSprite() {
      let sprite = this.characterData?.sprite ?? 0;
      let gender = this.characterData?.gender ?? "female";

      switch (gender) {
        case "male":
          return Object.values(maleSprites)[sprite];
        case "female":
        default:
          return Object.values(femaleSprites)[sprite];
      }
    },
    characterName() {
      return this.characterData?.nickname ?? "";
    },
  },
  props: {
    size: {
      type: String,
      default: "small"
    }
  },
  created() {
      this.characterData = this.persona;
  }
};
</script>