<template>
   <v-carousel v-model="model" @change="updateSprite">
      <v-carousel-item v-for="(sprite, i) in spriteOptions" :key="i">
         <v-sheet color="blue-grey darken-4" height="100%" tile>
            <v-row class="fill-height" align="center" justify="center">
               <div class="display-3 character-block">
                  <h3 color="primary">{{ user.name || "" }}</h3>
                  <img :src="sprite" :alt="i" />
               </div>
            </v-row>
         </v-sheet>
      </v-carousel-item>
   </v-carousel>
</template>

<script>
import femaleSprites from "../sprite/female/femaleExport.js";
import maleSprites from "../sprite/male/maleExport.js";

export default {
   name: "GenderOptions",
   data() {
      return {
         model: 0,
      };
   },
   computed: {
      spriteOptions() {
         return this.isDefaultGender ? femaleSprites : maleSprites;
      },
      isDefaultGender() {
         return this.gender == "female";
      },
   },
   methods: {
      updateSprite() {
         this.update(this.model);
      },
      reset() {
         this.model = 0;
      },
   },
   props: {
      user: {
         type: Object,
         default: {},
      },
      update: {
         type: Function,
         default: () => {},
      },
      gender: {
         type: String,
         default: "female",
      },
   },
};
</script>
