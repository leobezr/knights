import hero from "@/views/Maps/character/knight-attack-sheet_GG-2.png";
import doppelganger from "@/views/Maps/character/knight-attack-sheet_GG-doppleganger.png";

// import poring from "@/views/Maps/monsters/PORING_SPRITESHEET.png";
import poring from "@/views/Maps/monsters/spritesheet-poring.png";

export default {
   enemies: {
      doppelganger: {
         bg: doppelganger,
         rows: 6,
         cols: 5,
         width: 700,
         height: 1483,
         health: 20000,
         damage: 1,
         spriteHeight: (1483 / 6),
         name: "Doppelganger"
      },
      poring: {
         bg: poring,
         rows: 6,
         cols: 8,
         width: 1120,
         height: 1483,
         health: 200,
         damage: 1,
         spriteHeight: (1483 / 6) / 2,
         name: "Poring"
      }
   },
   players: {
      hero: {
         bg: hero,
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
