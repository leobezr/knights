<template>
   <div id="goldPlaceholder">
      <v-text-field label="Gold" color="amber" readonly :value="gold" prepend-inner-icon="mdi-gold" dark dense hide-details outlined>
         <template v-slot:prepend-inner>
            <v-icon color="amber" left>mdi-gold</v-icon>
         </template>
      </v-text-field>
   </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
   name: "GoldPlaceholder",
   computed: {
      ...mapGetters(["persona"]),

      gold() {
         if (this.persona) {
            return this.persona.gold ?? 0
         }
      }
   }
}
</script>
