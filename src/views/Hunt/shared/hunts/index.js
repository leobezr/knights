import PoringSprite from "@/views/Hunt/shared/img/monsters/porings/poring.gif";
import PoringBackgroundSprite from "@/views/Hunt/shared/img/monsters/porings/thumb-background.png";

import ZombieSprite from "@/views/Hunt/shared/img/monsters/zombie/zombie.gif";
import graveyardBackground from "@/views/Hunt/shared/img/monsters/zombie/graveyard.png";

import ZairoSprite from "@/views/Hunt/shared/img/monsters/goblins/zairo.gif";
import Doppelganger from "@/views/Hunt/shared/img/monsters/doppelganger/doppelganger.gif";
import Loki from "@/views/Hunt/shared/img/monsters/loki/loki.gif";

export default [
   {
      name: "Poring",
      sprite: PoringSprite,
      level: 1,
      bg: PoringBackgroundSprite,
      scale: 1.5,
   },
   {
      name: "Zombie",
      sprite: ZombieSprite,
      level: 50,
      bg: graveyardBackground,
      scale: 1,
   },
   {
      name: "Loki",
      sprite: Loki,
      level: 60,
      bg: graveyardBackground,
      scale: 1,
   },
]
