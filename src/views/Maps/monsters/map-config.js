import fieldScene from "@/views/Maps/maps/field.png";
import fieldNightScene from "@/views/Maps/maps/field-night.png";

import hero from "@/views/Maps/character/knight-attack-sheet_GG-2.png";

import doppelganger from "@/views/Maps/character/knight-attack-sheet_GG-doppleganger.png";
import poring from "@/views/Maps/monsters/spritesheet-poring.png";
import zombie from "@/views/Maps/monsters/spritesheet-zombie.png";

export default {
   enemies: {
      doppelganger: {
         id: 10000,
         spritesheet: doppelganger,
         rows: 6,
         cols: 5,
         width: 700,
         height: 1483,
         health: 20000,
         damage: 1,
         name: "Doppelganger",
         field: fieldScene
      },
      poring: {
         id: 10001,
         spritesheet: poring,
         rows: 6,
         cols: 8,
         width: 1120,
         height: 1483,
         health: 200,
         damage: 25,
         name: "Poring",
         field: fieldScene
      },
      zombie: {
         id: 10002,
         spritesheet: zombie,
         rows: 6,
         cols: 8,
         width: 1120,
         height: 1483,
         health: 200,
         damage: 1,
         field: fieldNightScene,
         name: "Zombie"
      }
   },
   players: {
      hero: {
         spritesheet: hero,
         rows: 6,
         cols: 5,
         width: 700,
         height: 1483,
         health: 100,
         damage: 200,
         spriteHeight: 0,
         name: null
      },
   }
}
