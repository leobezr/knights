<template>
   <div id="goldPlaceholder">
      <v-text-field
         label="Gold"
         color="amber"
         readonly
         :value="gold"
         prepend-inner-icon="mdi-gold"
         dark
         dense
         hide-details
         outlined
      >
         <template v-slot:prepend-inner>
            <v-icon color="amber" left>mdi-gold</v-icon>
         </template>
      </v-text-field>
   </div>
</template>

<script>
import { mapGetters } from "vuex";
import "@/views/Character/shared/scss/_goldPlaceholder.scss";

export default {
   name: "GoldPlaceholder",
   computed: {
      ...mapGetters(["persona"]),

      gold() {
         const PERSONA = this.persona;

         if (this.customValue > 0) {
            return this.customValue;
         }
         if (PERSONA && PERSONA.gold) {
            return PERSONA.gold.toLocaleString();
         }
         return 0;
      },
   },
   props: {
      "custom-value": {
         type: Number,
         default: 0,
      },
   },
};
</script>
