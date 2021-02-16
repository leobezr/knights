<template>
   <div id="topbar">
      <div class="wrapTopbarContent">
         <v-btn icon color="primary" @click="() => soundVolumeViewSet(true)">
            <v-icon>mdi-volume-high</v-icon>
         </v-btn>
      </div>
      <SoundVolumeManager
         :close="() => soundVolumeViewSet(false)"
         v-if="soundView"
      />
   </div>
</template>

<script>
import SoundVolumeManager from "@/shared/components/AD/molecules/SoundVolumeManager.vue";
import "@/shared/scss/_topbar.scss";

export default {
   name: "Topbar",
   data() {
      return {
         soundView: false,
      };
   },
   components: {
      SoundVolumeManager,
   },
   methods: {
      soundVolumeViewSet(set) {
         set = set ?? false;
         this.soundView = set;
      },
   },
};
</script>
