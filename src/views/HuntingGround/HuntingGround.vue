<template>
   <div
      class="loadingRoom"
      battleGrounds
      v-if="!clientClear"
      :style="battleFieldBackground"
   >
      <div class="sheet">
         <div class="msg">
            <h3>Game is loading, please wait.</h3>
            <v-progress-linear
               :value="clientsReadyPercent"
               color="primary"
               height="10"
            />
         </div>
      </div>
   </div>
   <div id="huntingGround" v-else>
      <div id="konvaWrapper" :class="canvasState" :style="mapBackground"></div>
      <div class="expInfo">
         <ExpBar :map-data="map" />
      </div>
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
                  v-if="isFinalRound"
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
import arenaBackgroundLoading from "@/shared/img/battlefield.jpg";
import Canvas from "@/views/HuntingGround/shared/utils/canvas.js";
import huntConfig from "@/shared/config/hunt-config.js";
import ExpBar from "@/views/HuntingGround/shared/AD/atoms/ExpBar.vue";
import { mapActions, mapState } from "vuex";
import "@/views/HuntingGround/shared/scss/_mapper.scss";

/**
 * @TODO
 * 1. Clean every that the server doesn't need to use, that is, stats.
 * 2. Hunting config doesn't need to exist, since every logic and company logic will be in the backend.
 * 3. Rounds will be managed by the server aswell.
 *
 * @REMOVED
 *
 *
 */

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
         playerProps: {},

         spectate: false,
         clientClear: false,
         arenaBackground: null,
         clientsReadyPercent: 0,
      };
   },
   components: {
      ExpBar,
   },
   computed: {
      ...mapState({
         persona: (store) => store.Knights.persona,
      }),

      isFinalRound() {
         return this.round >= this.maxRounds;
      },
      monsters() {
         const MAP = this.$route.params.hunt;

         const CREATURE = huntConfig.enemies[MAP];
         let enemies = [];

         for (let x = 0; x < this.round; x++) {
            enemies.push(CREATURE);
         }
         return enemies;
      },
      mapBackground() {
         if (this.arenaBackground) {
            return `background-image: url(${this.arenaBackground});`;
         }
         return "";
      },
      canvasState() {
         if (this.battle != null) {
            return this.battle ? "winner" : "loser";
         }
         return false;
      },

      battleFieldBackground() {
         return `background-image: url(${arenaBackgroundLoading});`;
      },
   },
   methods: {
      ...mapActions(["me", "getReward", "requestBattleAnimations"]),

      async getPlayerData() {
         const PERSONA = await this.me();

         this.playerProps.stats = PERSONA;
         this.playerProps.misc = PERSONA.misc;
         this.playerProps.vocation = PERSONA.vocation;
         this.playerProps.gender = PERSONA.gender;
         // this.init();
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

         if (MAP && huntConfig.enemies[MAP]) {
            this.map = new Canvas({
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

      /**
       * @NEW
       * New methods
       */
      async validateRoomId() {
         await this.me();
         const battleId = this.$route.params.hunt;

         if (this.persona.battleSession.id != battleId) {
            this.spectate = true;
         }

         try {
            const battleData = await this.requestBattleAnimations(battleId);
            let huntingGrounds = battleData.data.huntingGrounds;
            let path = process.env.VUE_APP_PUBLIC + huntingGrounds.path;

            this.startImageLoading({
               arena: process.env.VUE_APP_PUBLIC + huntingGrounds.arena,
               spritesheet: path + huntingGrounds.sprite.spritesheet,
            });
         } catch (err) {
            setTimeout(
               () => this.$router.push({ name: "Hunts" }).catch((e) => {}),
               100
            );

            throw Error(err);
         }
      },
      clientReady() {
         this.$socket.emit("clientReady", this.persona);
      },
      startImageLoading(pack) {
         const arenaBg = new Image();
         const spritesheet = new Image();

         let imageReady = 0;

         arenaBg.onload = () => {
            this.arenaBackground = pack.arena;
            imageReady++;
            if (imageReady == 2) {
               this.clientReady();
            }
         };
         spritesheet.onload = () => {
            imageReady++;
            if (imageReady == 2) {
               this.clientReady();
            }
         };

         arenaBg.src = pack.arena;
         spritesheet.src = pack.spritesheet;
      },
   },
   sockets: {
      clientBattleReady() {
         this.clientClear = true;
      },
      clientBattlePercent(percent) {
         this.clientsReadyPercent = percent;
      },
   },
   beforeDestroy() {
      this.sendDestroySignal();
      this.map = null;
   },
   mounted() {
      this.getPlayerData();
   },
   created() {
      this.validateRoomId();
   },
};
</script>
