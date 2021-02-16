<template>
   <CardBody modal custom-title ref="CB" class="soundVolume">
      <template v-slot:custom-title>
         <div class="customTitleWrap">
            <h3>Sound Manager</h3>
            <div class="actions">
               <v-btn icon color="primary" @click="close">
                  <v-icon> mdi-close </v-icon>
               </v-btn>
            </div>
         </div>
      </template>
      <template v-slot:content>
         <div class="wrapSoundVolumeOptions">
            <div class="soundEffects">
               <strong>Sound effects</strong>
               <div class="bar">
                  <v-btn
                     icon
                     color="primary"
                     @click="toggleMuteEffect('soundEffectVolume')"
                  >
                     <v-icon>{{ soundEffectIcon }}</v-icon>
                  </v-btn>
                  <v-progress-linear
                     v-model="soundEffectVolume"
                     color="primary"
                     height="10"
                     @change="updateVolumeCookie('soundEffectVolume')"
                  ></v-progress-linear>
               </div>
            </div>
            <div class="soundMusic">
               <strong>Music</strong>
               <div class="bar">
                  <v-btn
                     icon
                     color="primary"
                     @click="toggleMuteEffect('musicVolume')"
                  >
                     <v-icon>{{ musicIcon }}</v-icon>
                  </v-btn>
                  <v-progress-linear
                     v-model="musicVolume"
                     color="primary"
                     height="10"
                     @change="updateVolumeCookie('musicVolume')"
                  ></v-progress-linear>
               </div>
            </div>
         </div>
      </template>
   </CardBody>
</template>

<script>
import CardBody from "@/shared/components/AD/atoms/CardBody.vue";
import Cookie from "@/shared/utils/cookie.js";
import "@/shared/scss/_soundVolumeManager.scss";
import { mapMutations } from "vuex";

export default {
   name: "SoundVolumeManager",
   data() {
      return {
         soundEffectVolume: 50,
         musicVolume: 50,
      };
   },
   components: {
      CardBody,
   },
   computed: {
      soundEffectIcon() {
         return this.soundEffectVolume > 0
            ? "mdi-volume-high"
            : "mdi-volume-off";
      },
      musicIcon() {
         return this.musicVolume > 0 ? "mdi-volume-high" : "mdi-volume-off";
      },
   },
   methods: {
      ...mapMutations(["setVolume"]),

      getVolumeSettings() {
         this.soundEffectVolume = Cookie.get("soundEffectVolume") || 100;
         this.musicVolume = Cookie.get("musicVolume") || 100;
      },
      toggleMuteEffect(effect) {
         this[effect] <= 0 ? (this[effect] = 100) : (this[effect] = 0);
         this.updateVolumeCookie(effect);
      },
      updateVolumeCookie(effect) {
         Cookie.set(effect, String(this[effect]), 30);

         this.setVolume({
            effect,
            volume: this[effect],
         });
      },
   },
   props: {
      close: {
         type: Function,
         required: true,
      },
   },
   created() {
      this.getVolumeSettings();
   },
};
</script>
