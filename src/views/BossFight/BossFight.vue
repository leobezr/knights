<template>
   <div id="huntingGround">
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
import Canvas from "@/views/HuntingGround/shared/utils/canvas.js";
import huntConfig from "@/shared/config/hunt-config.js";
import huntLevel from "@/views/Hunt/shared/hunts/index.js";
import ExpBar from "@/views/HuntingGround/shared/AD/atoms/ExpBar.vue";
import { mapActions } from "vuex";
import "@/views/HuntingGround/shared/scss/_mapper.scss";

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
         maxRounds: 4,
         playerProps: {},
         bossLevel: null,
      };
   },
   components: {
      ExpBar,
   },
   computed: {
      isFinalRound() {
         return this.round >= this.maxRounds;
      },
      monsters() {
         const BOSS_LEVEL = this.$route.params.bossLevel;
         const CREATURE = huntLevel.bossLevel[BOSS_LEVEL];

         const repeat = (arr, count) => {
            count = count || 3;
            let list = [];

            for (let x = 0; x < count; x++) {
               list.push(huntConfig.enemies[arr.name]);
            }
            return list;
         };

         switch (this.round) {
            case 1:
               return repeat(CREATURE[0], 5);
            case 2:
               return repeat(CREATURE[1], 5);
            case 3:
               return repeat(CREATURE[2], 5);
            case 4:
               this.bossLevel = [
                  ...repeat(CREATURE[0]),
                  ...repeat(CREATURE[1]),
                  ...repeat(CREATURE[2]),
                  ...repeat(CREATURE[3], 1),
               ];
               return this.bossLevel;
         }
      },
      mapBackground() {
         const BOSS_LEVEL = this.$route.params.bossLevel;
         const CREATURE = huntLevel.bossLevel[BOSS_LEVEL];

         if (BOSS_LEVEL) {
            return `background-image: url(${
               huntConfig.enemies[CREATURE[0].name].field
            });`;
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
      ...mapActions(["me", "getReward", "getBossReward"]),

      async getPlayerData() {
         const PERSONA = await this.me();

         this.playerProps.stats = PERSONA;
         this.playerProps.misc = PERSONA.misc;
         this.playerProps.vocation = PERSONA.vocation;
         this.playerProps.gender = PERSONA.gender;
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
         const BOSS_LEVEL = this.$route.params.bossLevel;

         if (BOSS_LEVEL && huntLevel.bossLevel[BOSS_LEVEL]) {
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

            if (this.round == 4 && this.round == this.maxRounds) {
               const BOSS_LEVEL = this.$route.params.bossLevel;
               enemiesDefeated = {};

               for (let level in this.bossLevel) {
                  let creature = this.bossLevel[level];

                  if (!enemiesDefeated[creature.id]) {
                     enemiesDefeated[creature.id] = 1;
                  } else {
                     enemiesDefeated[creature.id] += 1;
                  }
               }

               this.getBossReward({
                  level: BOSS_LEVEL,
                  enemies: enemiesDefeated,
               })
                  .then(() => this.backToHuntLobby())
                  .catch((err) => {
                     throw Error(err);
                  })
                  .finally(() => (this.levelLoading = false));
            } else {
               this.getReward(enemiesDefeated)
                  .catch((err) => {
                     throw Error(err);
                  })
                  .finally(() => (this.levelLoading = false));
            }
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
