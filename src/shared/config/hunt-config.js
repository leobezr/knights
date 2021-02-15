import field from "@/views/HuntingGround/shared/fields/field.jpg";
import fieldNightScene from "@/views/HuntingGround/shared/fields/field-night.png";
import fieldAfternoon from "@/views/HuntingGround/shared/fields/field-afternoon.jpg"
import fieldDark from "@/views/HuntingGround/shared/fields/field-dark.jpg";
import fieldFullMoon from "@/views/HuntingGround/shared/fields/field-fullmoon.jpg"
import fieldNightfall from "@/views/HuntingGround/shared/fields/field-nightfall.jpg"
import fieldNoon from "@/views/HuntingGround/shared/fields/field-noon.jpg";

// Lv. 1 ~ 15
import poring from "@/views/HuntingGround/shared/sprites/creatures/poring.png";
import drops from "@/views/HuntingGround/shared/sprites/creatures/drops.png";
import arcAngeling from "@/views/HuntingGround/shared/sprites/creatures/arc-angeling.png";
import kingPoring from "@/views/HuntingGround/shared/sprites/creatures/king-poring.png";

// Lv. 15 ~ 30
import dokebi from "@/views/HuntingGround/shared/sprites/creatures/dokebi.png";
import babyOrc from "@/views/HuntingGround/shared/sprites/creatures/baby-orc.png";
import goblinDagger from "@/views/HuntingGround/shared/sprites/creatures/goblin-dagger.png";
import goblinLeader from "@/views/HuntingGround/shared/sprites/creatures/goblin-leader.png";

// Lv. 15 ~ 30
import deleter from "@/views/HuntingGround/shared/sprites/creatures/deleter.png";
import deleterSky from "@/views/HuntingGround/shared/sprites/creatures/deleter-sky.png";
import metalDragon from "@/views/HuntingGround/shared/sprites/creatures/metal-dragon.png";
// import goblinLeader from "@/views/HuntingGround/shared/sprites/creatures/goblin-leader.png";

import snake from "@/views/HuntingGround/shared/sprites/creatures/snake.png";
import arclouze from "@/views/HuntingGround/shared/sprites/creatures/arclouze.png";
import zombie from "@/views/HuntingGround/shared/sprites/creatures/spritesheet-zombie.png";
import skeleton from "@/views/HuntingGround/shared/sprites/creatures/skeleton.png";
import penguin from "@/views/HuntingGround/shared/sprites/creatures/penguin.png";
import atroce from "@/views/HuntingGround/shared/sprites/creatures/atroce-mvp.png";
import loki from "@/views/HuntingGround/shared/sprites/creatures/spritesheet-loki.png";

import creatureMap from "@/views/HuntingGround/shared/sprites/creatures/creatureMap.js";
import { sword } from "@/shared/utils/soundPack.js";

export default {
   enemies: {
      trainer: {
         id: 10001,
         health: 999999,
         def: 200,
         damage: 2,
         agi: 10,
         spritesheet: poring,
         sound: {
            attack: sword.punch,
            onHit: null,
         },
         attackRange: 10,
         rows: 7,
         cols: 8,
         width: 2400,
         height: 1732,
         name: "Poring",
         field: field,
         size: "normal",
         map: creatureMap.normal,
         grid: {
            width: 300,
            height: 247,
         },
      },

      // Lv. 0~15
      poring: {
         id: 10001,
         health: 50,
         def: 20,
         damage: 17,
         agi: 10,
         spritesheet: poring,
         sound: {
            attack: sword.punch,
            onHit: null,
         },
         attackRange: 10,
         rows: 7,
         cols: 8,
         width: 2400,
         height: 1732,
         name: "Poring",
         field: field,
         size: "normal",
         map: creatureMap.normal,
         grid: {
            width: 300,
            height: 247,
         },
      },
      drops: {
         id: 10002,
         health: 90,
         def: 40,
         damage: 35,
         agi: 10,
         spritesheet: drops,
         sound: {
            attack: sword.punch,
            onHit: null,
         },
         attackRange: 10,
         rows: 7,
         cols: 8,
         width: 2400,
         height: 1732,
         name: "Drops",
         field: field,
         size: "normal",
         map: creatureMap.normal,
         grid: {
            width: 300,
            height: 247,
         },
      },
      "arc-angeling": {
         id: 10003,
         health: 180,
         def: 50,
         damage: 40,
         agi: 80,
         spritesheet: arcAngeling,
         sound: {
            attack: sword.punch,
            onHit: null,
         },
         attackRange: 15,
         rows: 7,
         cols: 8,
         width: 2400,
         height: 1732,
         name: "Arc Angeling",
         field: field,
         size: "normal",
         map: creatureMap.normal,
         grid: {
            width: 300,
            height: 247,
         },
      },
      "king-poring": {
         id: 10004,
         health: 3500,
         def: 90,
         damage: 60,
         agi: 80,
         spritesheet: kingPoring,
         sound: {
            attack: sword.fast,
         },
         attackRange: 80,
         rows: 7,
         cols: 8,
         width: 4400,
         height: 3850,
         name: "King Poring",
         field: field,
         size: "large",
         map: creatureMap.large,
         grid: {
            width: 550,
            height: 550,
         },
      },

      // Lv. 15~30
      dokebi: {
         id: 10005,
         health: 430,
         def: 65,
         damage: 50,
         agi: 30,
         spritesheet: dokebi,
         sound: {
            attack: sword.punch,
            onHit: null,
         },
         attackRange: 15,
         rows: 7,
         cols: 8,
         width: 2400,
         height: 1732,
         name: "Dokebi",
         field: field,
         size: "normal",
         map: creatureMap.normal,
         grid: {
            width: 300,
            height: 247,
         },
      },
      "baby-orc": {
         id: 10006,
         health: 620,
         def: 30,
         damage: 75,
         agi: 50,
         spritesheet: babyOrc,
         sound: {
            attack: sword.fast,
            onHit: null,
         },
         attackRange: 15,
         rows: 7,
         cols: 8,
         width: 2400,
         height: 1732,
         name: "Drops",
         field: field,
         size: "normal",
         map: creatureMap.normal,
         grid: {
            width: 300,
            height: 247,
         },
      },
      "goblin-dagger": {
         id: 10007,
         health: 950,
         def: 30,
         damage: 75,
         agi: 120,
         spritesheet: goblinDagger,
         sound: {
            attack: sword.punch,
            onHit: null,
         },
         attackRange: 15,
         rows: 7,
         cols: 8,
         width: 2400,
         height: 1732,
         name: "Goblin Dagger",
         field: field,
         size: "normal",
         map: creatureMap.normal,
         grid: {
            width: 300,
            height: 247,
         },
      },
      "goblin-leader": {
         id: 10008,
         health: 5500,
         def: 250,
         damage: 120,
         agi: 80,
         spritesheet: goblinLeader,
         sound: {
            attack: sword.fast,
         },
         attackRange: 80,
         rows: 7,
         cols: 8,
         width: 2400,
         height: 1732,
         name: "Goblin Leader",
         field: field,
         size: "normal",
         map: creatureMap.normal,
         grid: {
            width: 300,
            height: 247,
         },
      },

      // Lv. 30~50
      "deleter": {
         id: 10009,
         health: 1200,
         def: 80,
         damage: 120,
         agi: 15,
         spritesheet: deleter,
         sound: {
            attack: sword.punch,
            onHit: null,
         },
         attackRange: 15,
         rows: 7,
         cols: 8,
         width: 2400,
         height: 1732,
         name: "Deleter",
         field: fieldAfternoon,
         size: "normal",
         map: creatureMap.normal,
         grid: {
            width: 300,
            height: 247,
         },
      },
      "deleter-sky": {
         id: 10010,
         health: 1350,
         def: 20,
         damage: 75,
         agi: 150,
         spritesheet: deleterSky,
         sound: {
            attack: sword.fast,
            onHit: null,
         },
         attackRange: 30,
         rows: 7,
         cols: 8,
         width: 2400,
         height: 1732,
         name: "Deleter Sky",
         field: fieldAfternoon,
         size: "normal",
         map: creatureMap.normal,
         grid: {
            width: 300,
            height: 247,
         },
      },
      "metal-dragon": {
         id: 10011,
         health: 2300,
         def: 300,
         damage: 210,
         agi: 80,
         spritesheet: metalDragon,
         sound: {
            attack: sword.punch,
            onHit: null,
         },
         attackRange: 80,
         rows: 7,
         cols: 8,
         width: 2400,
         height: 1732,
         name: "Metal Dragon",
         field: fieldAfternoon,
         size: "normal",
         map: creatureMap.normal,
         grid: {
            width: 300,
            height: 247,
         },
      },
      "a": {
         id: 10001,
         health: 350,
         def: 50,
         damage: 40,
         agi: 80,
         spritesheet: goblinLeader,
         sound: {
            attack: sword.punch,
            onHit: null,
         },
         attackRange: 15,
         rows: 7,
         cols: 8,
         width: 2400,
         height: 1732,
         name: "Goblin Leader",
         field: field,
         size: "normal",
         map: creatureMap.normal,
         grid: {
            width: 300,
            height: 247,
         },
      },

      snake: {
         id: 10004,
         health: 200,
         def: 10,
         damage: 30,
         agi: 25,
         spritesheet: snake,
         sound: {
            attack: sword.punch,
            onHit: null,
         },
         attackRange: 10,
         rows: 7,
         cols: 8,
         width: 2400,
         height: 1732,
         name: "Snake",
         field: field,
         size: "normal",
         map: creatureMap.normal,
         grid: {
            width: 300,
            height: 247,
         },
      },
      arclouze: {
         id: 10005,
         health: 400,
         def: 15,
         damage: 60,
         agi: 500,
         spritesheet: arclouze,
         sound: {
            attack: sword.punch,
            onHit: null,
         },
         attackRange: 10,
         rows: 7,
         cols: 8,
         width: 2400,
         height: 1732,
         name: "Arclouze",
         field: field,
         size: "normal",
         map: creatureMap.normal,
         grid: {
            width: 300,
            height: 247,
         },
      },

      zombie: {
         id: 10002,
         health: 800,
         def: 250,
         damage: 180,
         agi: 90,
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
         name: "Zombie",
         field: fieldNightScene,
         size: "normal",
         map: creatureMap.normal,
         grid: {
            width: 300,
            height: 247,
         },
      },
      skeleton: {
         id: 10006,
         health: 1500,
         def: 300,
         damage: 230,
         agi: 400,
         spritesheet: skeleton,
         sound: {
            attack: sword.fast,
            onHit: sword.punch
         },
         attackRange: 28,
         rows: 7,
         cols: 8,
         width: 2400,
         height: 1732,
         name: "Skeleton",
         field: fieldNightScene,
         size: "normal",
         map: creatureMap.normal,
         grid: {
            width: 300,
            height: 247,
         },
      },
      penguin: {
         id: 10007,
         health: 1900,
         def: 550,
         damage: 300,
         agi: 550,
         spritesheet: penguin,
         sound: {
            attack: sword.fast,
            onHit: sword.punch
         },
         attackRange: 25,
         rows: 7,
         cols: 8,
         width: 2400,
         height: 1732,
         name: "Penguin",
         field: fieldNightScene,
         size: "normal",
         map: creatureMap.normal,
         grid: {
            width: 300,
            height: 247,
         },
      },
      atroce: {
         id: 10008,
         health: 15000,
         def: 800,
         damage: 1200,
         agi: 500,
         spritesheet: atroce,
         sound: {
            attack: sword.fast,
            onHit: sword.punch
         },
         attackRange: 50,
         rows: 7,
         cols: 8,
         width: 4400,
         height: 3850,
         name: "Atroce",
         field: fieldNightScene,
         size: "large",
         map: creatureMap.large,
         grid: {
            width: 550,
            height: 550,
         },
      },

      loki: {
         id: 10003,
         health: 900,
         def: 50,
         damage: 700,
         agi: 350,
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
         field: fieldNightScene,
         size: "normal",
         map: creatureMap.normal,
         grid: {
            width: 300,
            height: 247,
         },
      },
   },
}
