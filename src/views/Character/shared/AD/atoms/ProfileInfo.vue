<template>
   <div id="profileInfo" class="mb-5" v-if="data">
      <strong>Character Info</strong>
      <div class="nickname mt-3">
         <v-text-field
            label="Nickname"
            dark
            outlined
            :value="data.nickname"
            dense
            hide-details
            color="primary"
            readonly
         />
         <v-text-field
            label="Vocation"
            dark
            outlined
            :value="data.vocation"
            dense
            hide-details
            color="primary"
            readonly
         />
         <Tooltip
            label="Keep a high honor. It's key factor when selling and buying items. It also helps you when losing a battle and drop rate."
         >
            <template v-slot:content>
               <v-text-field
                  label="Honor"
                  dark
                  outlined
                  :value="data.honor.toLocaleString()"
                  dense
                  hide-details
                  color="primary"
                  readonly
                  :class="data.honor < 0 ? 'badHonor' : 'goodHonor'"
               />
            </template>
         </Tooltip>
      </div>
      <div class="gender-and-age mt-3">
         <v-text-field
            label="Gender"
            dark
            outlined
            :value="data.gender"
            dense
            hide-details
            color="primary"
            readonly
         />
         <v-text-field
            label="Level"
            dark
            :value="data.level"
            outlined
            dense
            hide-details
            color="primary"
            readonly
         />
         <v-text-field
            label="Experience"
            dark
            :value="data.experience.toLocaleString()"
            outlined
            dense
            hide-details
            color="primary"
            readonly
         />
      </div>
   </div>
</template>

<script>
import { mapGetters } from "vuex";
import Tooltip from "@/shared/components/AD/atoms/Tooltip.vue";

export default {
   name: "ProfileInfo",
   components: {
      Tooltip,
   },
   computed: {
      ...mapGetters(["persona"]),

      data() {
         return this.persona || false;
      },
   },
};
</script>
