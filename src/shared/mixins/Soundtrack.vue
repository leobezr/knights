<script>
import { Howl } from "howler";
import { song } from "@/shared/utils/soundPack.js";

export default {
   name: "Soundtrack",
   data() {
      return {
         soundtrack: null,
         trackName: null,
      };
   },
   computed: {
      routeSoundTrack() {
         return () => {
            if (this.$route.meta && this.$route.meta.soundtrack) {
               return this.$route.meta.soundtrack;
            } else {
               return false;
            }
         };
      },
   },
   methods: {
      playSoundtrack() {
         if (this.soundtrack) {
            this.soundtrack.stop();
            this.soundtrack = null;
         }
         if (this.routeSoundTrack()) {
            this.soundtrack = new Howl({
               src: [song[this.routeSoundTrack()]],
               loop: true,
               volume: 0.05,
            });
         } else {
            this.soundtrack = new Howl({
               src: [song.default],
               loop: true,
               volume: 0.05,
            });
         }

         this.soundtrack.play();
      },
   },
   created() {
      this.playSoundtrack();
   },
   beforeDestroy() {
      this.soundtrack.stop();
   },
   watch: {
      $route: {
         handler(current, prev) {
            if (current.meta.soundtrack != prev.meta.soundtrack) {
               this.playSoundtrack();
            }
         },
      },
   },
};
</script>
