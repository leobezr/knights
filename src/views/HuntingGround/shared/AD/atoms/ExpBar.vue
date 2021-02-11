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
                  <span><strong>Exp</strong> {{ user.experience }}</span>
                  <span><strong>Exp Gained</strong> {{ expGained }}</span>
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
