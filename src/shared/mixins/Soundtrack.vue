<script>
import { Howl } from "howler";
import { song } from "@/shared/utils/soundPack.js";
import { mapMutations, mapState } from "vuex";
import Cookie from "@/shared/utils/cookie.js";

export default {
   name: "Soundtrack",
   data() {
      return {
         soundtrack: null,
         trackName: null,
      };
   },
   computed: {
      ...mapState({
         soundEffectVolume: (store) => store.Volume.soundEffectVolume,
         musicVolume: (store) => store.Volume.musicVolume,
      }),

      routeSoundTrack() {
         return () => {
            if (this.$route.meta && this.$route.meta.soundtrack) {
               return this.$route.meta.soundtrack;
            } else {
               return false;
            }
         };
      },
      toVolumeValue() {
         return (v) => {
            let soundVolume = v;
            return soundVolume * 0.001;
         };
      },
   },
   methods: {
      ...mapMutations(["setVolume"]),

      getVolumeSettings() {
         const soundEffectVolume = Cookie.get("soundEffectVolume") || 50;
         const musicVolume = Cookie.get("musicVolume") || 50;

         this.setVolume({
            effect: "soundEffectVolume",
            volume: soundEffectVolume,
         });

         this.setVolume({
            effect: "musicVolume",
            volume: musicVolume,
         });

         this.playSoundtrack();
         this.setVolume(musicVolume)
      },
      playSoundtrack() {
         if (this.soundtrack) {
            this.soundtrack.stop();
            this.soundtrack = null;
         }
         if (this.routeSoundTrack()) {
            this.soundtrack = new Howl({
               src: [song[this.routeSoundTrack()]],
               loop: true,
               volume: this.toVolumeValue(this.soundEffectVolume),
            });
         } else {
            this.soundtrack = new Howl({
               src: [song.default],
               loop: true,
               volume: this.toVolumeValue(this.musicVolume),
            });
         }

         this.soundtrack.play();
      },
      setVolume(volume) {
         if (this.soundtrack) {
            volume = volume || this.musicVolume;
            this.soundtrack.volume(this.toVolumeValue(volume));
         }
      },
   },
   created() {
      this.getVolumeSettings();
   },
   beforeDestroy() {
      this.soundtrack.stop();
   },
   watch: {
      $route: {
         handler(current, prev) {
            if (current.meta.soundtrack != prev.meta.soundtrack) {
               this.getVolumeSettings();
            }
         },
      },
      musicVolume: {
         handler(volume) {
            this.playSoundtrack();
            this.setVolume(volume);
         },
      },
   },
};
</script>
