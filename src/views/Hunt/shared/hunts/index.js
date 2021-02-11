import Field from "@/views/Hunt/shared/img/scene/field.png";
import FieldNightScene from "@/views/Hunt/shared/img/scene/field-night.png";
import FieldAfternoon from "@/views/Hunt/shared/img/scene/field-afternoon.png"
import FieldDark from "@/views/Hunt/shared/img/scene/field-dark.png";
import FieldFullMoon from "@/views/Hunt/shared/img/scene/field-fullmoon.png"
import FieldNightfall from "@/views/Hunt/shared/img/scene/field-nightfall.png"
import FieldNoon from "@/views/Hunt/shared/img/scene/field-noon.png";

// Lv. 0~15
import Poring from "@/views/Hunt/shared/img/monsters/poring.gif";
import Drops from "@/views/Hunt/shared/img/monsters/drops.gif";
import ArcAngeling from "@/views/Hunt/shared/img/monsters/arc-angeling.gif";
import KingPoring from "@/views/Hunt/shared/img/monsters/king-poring.gif";

// Lv. 15~30
import Dokebi from "@/views/Hunt/shared/img/monsters/dokebi.gif";
import BabyOrc from "@/views/Hunt/shared/img/monsters/baby-orc.gif";
import GoblinDagger from "@/views/Hunt/shared/img/monsters/goblin-dagger.gif";
import GoblinLeader from "@/views/Hunt/shared/img/monsters/goblin-leader.gif";

// Lv. 30~45
import Deleter from "@/views/Hunt/shared/img/monsters/deleter.gif";
import DeleterSky from "@/views/Hunt/shared/img/monsters/deleter-sky.gif";
import MetalDragon from "@/views/Hunt/shared/img/monsters/metal-dragon.gif";
import Harpy from "@/views/Hunt/shared/img/monsters/harpy.gif";

// Lv. 45~70
import Bongun from "@/views/Hunt/shared/img/monsters/bongun.gif";
import Munak from "@/views/Hunt/shared/img/monsters/munak.gif";
import Hyegun from "@/views/Hunt/shared/img/monsters/hyegun.gif";
import Necromancer from "@/views/Hunt/shared/img/monsters/necromancer.gif";

import Zombie from "@/views/Hunt/shared/img/monsters/zombie.gif";
import Snake from "@/views/Hunt/shared/img/monsters/snake.gif";
import Arclouze from "@/views/Hunt/shared/img/monsters/arclouze.gif";
import Skeleton from "@/views/Hunt/shared/img/monsters/skeleton.gif";
import Penguin from "@/views/Hunt/shared/img/monsters/penguin.gif";
import Atroce from "@/views/Hunt/shared/img/monsters/atroce.gif";
import Loki from "@/views/Hunt/shared/img/monsters/loki.gif";

const levels = {
   "0-15": [
      {
         label: "Poring",
         name: "poring",
         sprite: Poring,
         level: 1,
         bg: Field,
         scale: 1,
      },
      {
         label: "Drops",
         name: "drops",
         sprite: Drops,
         level: 10,
         bg: Field,
         scale: 1,
      },
      {
         label: "Arc Angeling",
         name: "arc-angeling",
         sprite: ArcAngeling,
         level: 15,
         bg: Field,
         scale: 1,
      },
   ],
   "15-30": [
      {
         label: "Dokebi",
         name: "dokebi",
         sprite: Dokebi,
         level: 15,
         bg: FieldFullMoon,
         scale: 1,
      },
      {
         label: "Baby Orc",
         name: "baby-orc",
         sprite: BabyOrc,
         level: 20,
         bg: FieldFullMoon,
         scale: 1,
      },
      {
         label: "Goblin",
         name: "goblin-dagger",
         sprite: GoblinDagger,
         level: 30,
         bg: FieldFullMoon,
         scale: 1,
      },
   ],
   "30-50": [
      {
         label: "Deleter",
         name: "deleter",
         sprite: Deleter,
         level: 30,
         bg: FieldAfternoon,
         scale: 1,
      },
      {
         label: "Deleter Sky",
         name: "deleter-sky",
         sprite: DeleterSky,
         level: 40,
         bg: FieldAfternoon,
         scale: 1,
      },
      {
         label: "Metal Dragon",
         name: "metal-dragon",
         sprite: MetalDragon,
         level: 45,
         bg: FieldAfternoon,
         scale: 1,
      },
   ],
   "50-80": [
      {
         label: "Bongun",
         name: "bongun",
         sprite: Bongun,
         level: 45,
         bg: FieldNightfall,
         scale: 1,
      },
      {
         label: "Munak",
         name: "munak",
         sprite: Munak,
         level: 55,
         bg: FieldNightfall,
         scale: 1,
      },
      {
         label: "Hyegun",
         name: "hyegun",
         sprite: Hyegun,
         level: 65,
         bg: FieldNightfall,
         scale: 1,
      },
   ],
}


export default {
   normalLevel: {
      "0-15": [...levels["0-15"]],
      "15-30": [...levels["15-30"]],
      "30-50": [...levels["30-50"]],
      "50-80": [...levels["50-80"]],
   },
   bossLevel: {
      "0-15": [
         ...levels["0-15"],
         {
            label: "King Poring",
            name: "king-poring",
            sprite: KingPoring,
            level: 15,
            bg: Field,
            scale: .6,
         },
      ],
      "15-30": [
         ...levels["15-30"],
         {
            label: "Goblin Leader",
            name: "goblin-leader",
            sprite: GoblinLeader,
            level: 30,
            bg: FieldFullMoon,
            scale: 1.4,
         },
      ],
   }
}
