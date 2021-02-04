<template>
   <div id="canvasMapReader">
      <canvas
         :width="maxWindowWidth"
         :height="maxWindowHeight"
         :style="mapBackground"
         :class="canvasState"
         @mousedown="attack"
         v-if="!shouldUpdate"
         ref="Canvas"
      />
      <div class="battleStats" v-if="canvasState">
         <div class="winner" v-if="canvasState == 'winner'">
            <span>COMPLETE</span>
            <div class="controller">
               <v-btn @click="goAgain" class="mr-2" color="primary"
                  >Continue</v-btn
               >
               <v-btn
                  class="pink accent-3 white--text"
                  @click="backToHuntLobby('wone')"
                  :loading="levelLoading"
                  >Get reward</v-btn
               >
            </div>
         </div>
         <div class="loser" v-else>
            <span>FAILED</span>
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
import { mapActions, mapGetters } from "vuex";

export default {
   name: "MapReader",
   data() {
      return {
         battle: null,
         characterStats: {},
         enemy: null,
         mapName: null,
         map: null,
         levelLoading: false,
         shouldUpdate: false,
      };
   },
   computed: {
      ...mapGetters(["persona"]),

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
      computedStats() {
         let stats = {};

         for (let attr in this.characterStats.attributes) {
            stats[attr] = this.characterStats.attributes[attr];
         }
         for (let attr in this.characterStats.modifier) {
            stats[attr] += this.characterStats.modifier[attr];
         }
         return stats;
      },
      battleStats() {
         if (this.characterStats) {
            return {
               damage: this.characterStats.attributes.hit,
               hp: this.characterStats.attributes.hp,
               def: this.characterStats.attributes.def,
               agi: this.computedStats.agi,
            };
         } else {
            return false;
         }
      },
   },
   methods: {
      ...mapActions(["getReward", "me"]),

      goAgain() {
         this.battle = null;
         this.shouldUpdate = true;

         setTimeout(() => {
            this.shouldUpdate = false;
         }, 10);
         setTimeout(() => {
            this.setMap();
            this.setKeyFunction();
         }, 15);
      },
      init() {
         if (this.persona) {
            this.createInstance();
         } else {
            this.me();
         }
      },
      createInstance() {
         if (!this.map) {
            this.setMap();
            this.setKeyFunction();
         }
      },
      setMap() {
         const MAP = this.$route.params.hunt;

         if (MAP && mapConfig.enemies[MAP]) {
            this.mapName = MAP;
            this.map = new CanvasDrawer({
               win: this.winMatch,
               lose: this.loseMatch,
               $canvas: this.$refs.Canvas,
               playerStats: this.battleStats,
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
   watch: {
      persona: {
         handler() {
            this.characterStats = this.persona;
            this.createInstance();
         },
      },
   },
   created() {
      this.characterStats = this.persona;
   },
   mounted() {
      this.init();
   },
   beforeDestroy() {
      window.removeEventListener("keydown", this.arrowWalk, false);
      window.removeEventListener("keyup", this.arrowStopWalk, false);
   },
};
</script>
