<template>
   <div id="huntingGround">
      <div id="konvaWrapper" :class="canvasState" :style="mapBackground"></div>
      <div class="battleStats" v-if="canvasState">
         <div class="winner" v-if="canvasState == 'winner'">
            <span>COMPLETE</span>
            <div class="controller">
               <v-btn
                  @click="goAgain"
                  v-if="!isFinalRound"
                  class="mr-2"
                  color="primary"
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
import Canvas from "@/views/HuntingGround.vue/shared/utils/canvas.js";
import field from "@/views/Maps/maps/field.png";
import mapConfig from "@/views/Maps/monsters/map-config.js";
import { mapActions } from "vuex";
import "@/views/HuntingGround.vue/shared/scss/_mapper.scss";

export default {
   name: "HuntingGround",
   data() {
      return {
         map: null,
         battle: null,
         characterStats: {},
         levelLoading: false,
         sentReward: false,
         round: 1,
         maxRounds: 10,
         playerProps: {}
      };
   },
   computed: {
      isFinalRound() {
         return this.round >= this.maxRounds;
      },
      monsters() {
         const MAP = this.$route.params.hunt;

         const CREATURE = mapConfig.enemies[MAP];
         let enemies = [];

         for (let x = 0; x < this.round; x++) {
            enemies.push(CREATURE);
         }
         return enemies;
      },
      mapBackground() {
         const MAP = this.$route.params.hunt;

         if (MAP) {
            return `background-image: url(${mapConfig.enemies[MAP].field});`;
         }
      },
      canvasState() {
         if (this.battle != null) {
            return this.battle ? "winner" : "loser";
         }
         return false;
      },
   },
   methods: {
      ...mapActions(["me", "getReward"]),

      async getPlayerData() {
         const PERSONA = await this.me();

         this.playerProps.stats = PERSONA;
         this.playerProps.misc = PERSONA.misc;
         this.init();
      },
      backToHuntLobby() {
         this.$router.push({ name: "Hunts" }).catch((e) => {});
      },
      goAgain() {
         this.battle = null;
         this.round++;

         this.sentReward = false;
         this.sendDestroySignal("partial");

         this.map.updateMonsterList(this.monsters);
         this.map.spawnMonsters();
      },
      init() {
         const MAP = this.$route.params.hunt;

         if (MAP && mapConfig.enemies[MAP]) {
            this.map = new Canvas({
               bg: field,
               monsters: this.monsters,
               playerProps: this.playerProps,
               actions: {
                  win: this.winMatch,
                  lose: this.loseMatch,
               },
            });
         } else {
            this.backToHuntLobby();
         }

         this.map.init();
      },
      loseMatch() {
         this.battle = false;
      },
      sendDestroySignal(command) {
         command = command || "all";

         if (command == "all") {
            this.map.destroyEvents();
         } else {
            this.map.cleanCache();
         }
      },
      winMatch(enemiesDefeated) {
         this.battle = true;

         if (!this.sentReward) {
            this.levelLoading = true;
            this.sentReward = true;

            this.getReward(enemiesDefeated)
               .catch((err) => {
                  throw Error(err);
               })
               .finally(() => (this.levelLoading = false));
         }
      },
   },
   beforeDestroy() {
      this.sendDestroySignal();
      this.map = null;
   },
   mounted() {
      this.getPlayerData();
   },
};
</script>
