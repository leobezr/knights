<template>
   <div id="konvaWrapper" :style="background"></div>
</template>

<script>
import Canvas from "@/views/HuntingGround.vue/shared/utils/canvas.js";
import field from "@/views/Maps/maps/field.png";
import mapConfig from "@/views/Maps/monsters/map-config.js";
import "@/views/HuntingGround.vue/shared/scss/_mapper.scss";
import { mapActions } from "vuex";

export default {
   name: "p5",
   data() {
      return {
         map: null,
         events: [],
      };
   },
   computed: {
      monsters() {
         const PORING = mapConfig.enemies.poring;
         let enemies = [];

         for (let x = 0; x < 4; x++) {
            enemies.push(PORING);
         }
         return enemies;
      },
      player() {
         return mapConfig.players.hero;
      },
      background() {
         return `background-image: url(${field});`;
      },
   },
   methods: {
      ...mapActions(["me"]),

      async getPlayerData() {
         const PERSONA = await this.me();

         this.player.stats = PERSONA;
         this.init();
      },
      setEvent(eventName, event) {
         this.events.push({ eventName, event });
      },
      init() {
         this.map = new Canvas({
            bg: field,
            monsters: this.monsters,
            player: this.player,
            eventSetter: this.setEvent,
         });

         this.map.init();
      },
   },
   mounted() {
      this.getPlayerData();
   },
};
</script>
