import fieldScene from "@/views/Maps/maps/field.png";
import fieldNightScene from "@/views/Maps/maps/field-night.png";

import swordman from "@/views/Maps/character/swordman.png";

import poring from "@/views/Maps/monsters/spritesheet-poring.png";
import zombie from "@/views/Maps/monsters/spritesheet-zombie.png";
import loki from "@/views/Maps/monsters/spritesheet-loki.png";

import { sword } from "@/shared/utils/soundPack.js";

export default {
   enemies: {
      poring: {
         id: 10001,
         health: 50,
         def: 0,
         damage: 6,
         agi: 35,
         spritesheet: poring,
         sound: {
            attack: sword.punch,
            onHit: null,
         },
         attackRange: 10,
         rows: 6,
         cols: 8,
         width: 1120,
         height: 1483,
         name: "Poring",
         field: fieldScene
      },
      zombie: {
         id: 10002,
         health: 250,
         def: 15,
         damage: 10,
         agi: 35,
         spritesheet: zombie,
         sound: {
            attack: sword.monsterAttack,
            onHit: sword.monsterGrowl,
         },
         attackRange: 15,
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
         def: 150,
         damage: 200,
         agi: 800,
         attackRange: 20,
         spritesheet: loki,
         sound: {
            attack: sword.fast,
            onHit: sword.punch
         },
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
         sound: {
            attack: sword.slow,
            onHit: sword.punch
         },
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
