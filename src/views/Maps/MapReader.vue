<template>
   <canvas
      id="canvasMapReader"
      :width="maxWindowWidth"
      :height="maxWindowHeight"
      :style="mapBackground"
      @mousedown="attack"
      ref="Canvas"
   />
</template>

<script>
import mapConfig from "@/views/Maps/config/map-config.js";
import CanvasDrawer from "@/views/Maps/config/canvas-drawer.js";
import "@/views/Maps/shared/scss/_mapReader.scss";

export default {
   name: "MapReader",
   data() {
      return {
         mapName: null,
         map: null,
         characterStats: {
            life: 10000,
            dmg: 10,
         },
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
   },
   methods: {
      setMap() {
         const MAP = this.$route.params.hunt;
         let a = mapConfig

         if (MAP && mapConfig.enemies[MAP]) {
            this.mapName = MAP;
            this.map = new CanvasDrawer({
               win: this.winMatch,
               lose: this.loseMatch,
               $canvas: this.$refs.Canvas,
               playerStats: this.characterStats,
               monster: mapConfig.enemies[MAP],
            });
         } else {
            this.$router.push({ name: "Hunts" }).catch((e) => {});
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
      setKeyFunction() {
         window.addEventListener("keydown", this.arrowWalk);
         window.addEventListener("keyup", this.arrowStopWalk);
      },
      winMatch() {
         console.log("wone match");
      },
      loseMatch() {
         console.log("lost match");
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
