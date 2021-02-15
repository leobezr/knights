<template>
   <div id="characterExpBar">
      <div class="boxContainer" @click="menuToggle">
         <div class="boxHeader">Character Info</div>
         <div class="boxContent" v-if="isMenuOpen && user">
            <div class="upperContent">
               <div class="characterData">
                  <span><strong>Name: </strong>{{ user.nickname }}</span>
                  <span><strong>Vocation: </strong>{{ user.vocation }}</span>
               </div>
               <div class="hpBar">
                  <span v-if="characterHp"
                     ><strong>HP: </strong>{{ characterHp.hp }} /
                     {{ characterHp.maxHp }}</span
                  >
               </div>
            </div>
            <div class="middleContent">
               <div class="level">
                  <span
                     ><strong>Exp: </strong> {{ user.experience }}
                     <v-progress-linear
                        :value="nextLevelExp"
                        color="blue-grey darken-4"
                        disabled
                        height="18"
                     >
                        <template v-slot:default="{ value }">
                           <strong>{{ Math.ceil(value) }}% </strong>
                        </template>
                     </v-progress-linear></span
                  >
                  <span><strong>Exp Gained: </strong> {{ expGained }}</span>
                  <span><strong>Character Lv.</strong> {{ user.level }}</span>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import "@/views/HuntingGround/shared/scss/_expBar.scss";
import { mapActions, mapGetters } from "vuex";

export default {
   name: "ExpBar",
   data() {
      return {
         menuStage: 1,
         user: null,
         totalExpStarted: 0,
      };
   },
   computed: {
      ...mapGetters(["persona"]),

      isMenuOpen() {
         return this.menuStage > 0;
      },
      characterHp() {
         if (this.mapData) {
            if (!this.mapData.arena?.player?.config) return;

            return {
               hp: this.mapData.arena.player.config.stats.hp,
               maxHp: this.mapData.arena.player.config.stats.maxHp,
            };
         }
         return false;
      },
      expGained() {
         return this.user.experience - this.totalExpStarted;
      },
      nextLevelExp() {
         const levelExp = (level) =>
            Math.round((50 * Math.pow(level, 3)) / 3) -
            Math.round(100 * Math.pow(level, 2)) +
            Math.round((850 * Math.pow(level, 1)) / 3) -
            200;

         let currentLevel = this.user.level;
         let currentLevelExp = levelExp(currentLevel);

         let nextLevel = currentLevel + 1;
         let nextLevelExp = levelExp(nextLevel);

         let expGap = nextLevelExp - currentLevelExp;

         return ((this.user.experience - currentLevelExp) / expGap) * 100;
      },
   },
   methods: {
      ...mapActions(["me"]),

      menuToggle() {
         this.menuStage = this.menuStage > 0 ? 0 : 1;
      },
      async fillUserData() {
         await this.me();

         this.user = this.persona;
         this.totalExpStarted = this.user.experience;
      },
   },
   props: {
      "map-data": {
         type: Object,
         default: Object,
      },
   },
   watch: {
      persona: {
         handler() {
            this.user = this.persona;
         },
      },
   },
   created() {
      this.fillUserData();
   },
};
</script>
