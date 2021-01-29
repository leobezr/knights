import PoringSprite from "@/views/Hunt/shared/img/monsters/porings/poring.gif";
import PoringBackgroundSprite from "@/views/Hunt/shared/img/monsters/porings/thumb-background.png";

import ZombieSprite from "@/views/Hunt/shared/img/monsters/zombie/zombie.gif";
import graveyardBackground from "@/views/Hunt/shared/img/monsters/zombie/graveyard.png";

import ZairoSprite from "@/views/Hunt/shared/img/monsters/goblins/zairo.gif";

export default [
   {
      name: "Poring",
      sprite: PoringSprite,
      level: 1,
      bg: PoringBackgroundSprite,
      scale: 1.5,
   },
   {
      name: "Zairo",
      sprite: ZairoSprite,
      level: 30,
      bg: PoringBackgroundSprite,
      scale: 1,
   },
   {
      name: "Zombie",
      sprite: ZombieSprite,
      level: 30,
      bg: graveyardBackground,
      scale: 1,
   },
]