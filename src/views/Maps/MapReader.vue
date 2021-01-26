<template>
   <div id="canvasMapReader">
      <canvas
         :width="maxWindowWidth"
         :height="maxWindowHeight"
         :style="mapBackground"
         :class="canvasState"
         @mousedown="attack"
         ref="Canvas"
      />
      <div class="battleStats" v-if="canvasState">
         <div class="winner" v-if="canvasState == 'winner'">
            <span>WINNER</span>
            <v-btn
               color="amber"
               @click="backToHuntLobby('wone')"
               :loading="levelLoading"
               >Get reward</v-btn
            >
         </div>
         <div class="loser" v-else>
            <span>LOSER</span>
            <v-btn
               class="pink accent-3 white--text"
               @click="backToHuntLobby"
               :loading="levelLoading"
               >Go back</v-btn
            >
         </div>
      </div>
   </div>
</template>

<script>
import mapConfig from "@/views/Maps/monsters/map-config.js";
import CanvasDrawer from "@/views/Maps/config/canvas-drawer.js";
import "@/views/Maps/shared/scss/_mapReader.scss";
import { mapActions } from "vuex";

export default {
   name: "MapReader",
   data() {
      return {
         battle: null,
         characterStats: {
            life: 10000,
            dmg: 10,
         },
         enemy: null,
         mapName: null,
         map: null,
         levelLoading: false,
      };
   },
   computed: {
      maxWindowHeight() {
         return Math.round(window.innerHeight - 80);
      },
      mapBackground() {
         if (this.mapName) {
            return `background-image: url(${
               mapConfig.enemies[this.mapName].field
            });`;
         }
      },
      maxWindowWidth() {
         return Math.round(window.innerWidth - 80);
      },
      canvasState() {
         if (this.battle != null) {
            return this.battle ? "winner" : "loser";
         }
         return false;
      },
   },
   methods: {
      ...mapActions(["getReward"]),

      setMap() {
         const MAP = this.$route.params.hunt;

         if (MAP && mapConfig.enemies[MAP]) {
            this.mapName = MAP;
            this.map = new CanvasDrawer({
               win: this.winMatch,
               lose: this.loseMatch,
               $canvas: this.$refs.Canvas,
               playerStats: this.characterStats,
               monster: mapConfig.enemies[MAP],
            });
            this.enemy = mapConfig.enemies[MAP].id;
         } else {
            this.backToHuntLobby();
         }
      },
      attack() {
         if (this.map) {
            this.map.attack();
         }
      },
      arrowWalk(event) {
         this.map.move(event.keyCode);
      },
      arrowStopWalk() {
         this.map.stop();
      },
      backToHuntLobby() {
         this.$router.push({ name: "Hunts" }).catch((e) => {});
      },
      setKeyFunction() {
         window.addEventListener("keydown", this.arrowWalk);
         window.addEventListener("keyup", this.arrowStopWalk);
      },
      winMatch() {
         this.battle = true;
         this.levelLoading = true;

         this.getReward(this.enemy)
            .catch((err) => {
               throw Error(err);
            })
            .finally(() => (this.levelLoading = false));
      },
      loseMatch() {
         this.battle = false;
      },
   },
   mounted() {
      this.setMap();
      this.setKeyFunction();
   },
   beforeDestroy() {
      window.removeEventListener("keydown", this.arrowWalk, false);
      window.removeEventListener("keyup", this.arrowStopWalk, false);
   },
};
</script>
