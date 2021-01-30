import fieldScene from "@/views/Maps/maps/field.png";
import fieldNightScene from "@/views/Maps/maps/field-night.png";

import swordman from "@/views/Maps/character/swordman.png";

import poring from "@/views/Maps/monsters/spritesheet-poring.png";
import zombie from "@/views/Maps/monsters/spritesheet-zombie.png";
import loki from "@/views/Maps/monsters/spritesheet-loki.png";

export default {
   enemies: {
      poring: {
         id: 10001,
         health: 200,
         def: 0,
         damage: 5,
         agi: 10,
         spritesheet: poring,
         rows: 6,
         cols: 8,
         width: 1120,
         height: 1483,
         name: "Poring",
         field: fieldScene
      },
      zombie: {
         id: 10002,
         health: 350,
         def: 15,
         damage: 25,
         agi: 10,
         spritesheet: zombie,
         rows: 6,
         cols: 8,
         width: 1120,
         height: 1483,
         field: fieldNightScene,
         name: "Zombie"
      },
      loki: {
         id: 10003,
         health: 900,
         def: 250,
         damage: 250,
         agi: 80,
         spritesheet: loki,
         rows: 6,
         cols: 5,
         width: 700,
         height: 1483,
         name: "Loki",
         field: fieldNightScene
      },
   },
   players: {
      hero: {
         spritesheet: swordman,
         rows: 6,
         cols: 8,
         width: 1120,
         height: 1483,
         health: 100,
         damage: 200,
         spriteHeight: 0,
         name: null
      },
   }
}
