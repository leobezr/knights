<template>
   <span class="modifierStats isText isSmall" :negative="isNegative" v-if="mod">
      <span>{{ mod }}</span>
   </span>
</template>

<script>
export default {
   name: "ModifierStats",
   computed: {
      mod() {
         let modifier = this.attr[this.stats];

         if (modifier) {
            return modifier > 0 ? `+${modifier}` : `${modifier}`;
         } else {
            return false;
         }
      },
      isNegative() {
         if (this.mod) {
            return this.mod < 0;
         }
         return false;
      },
   },
   props: {
      stats: {
         type: String,
         required: true,
      },
      attr: {
         type: Object,
         required: true,
      },
   },
};
</script>
