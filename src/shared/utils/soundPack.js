// Soundtrack
import loginTheme from "@/shared/sounds/songs/login.mp3";
import defaultTheme from "@/shared/sounds/songs/payon.mp3";
import shopTheme from "@/shared/sounds/songs/shop.mp3";
import huntTheme from "@/shared/sounds/hunt/default.mp3";

// Sound Effects
import swordSlashSlow from "@/shared/sounds/battle/sword/sword-1-slow.mp3";
import swordSlashFast from "@/shared/sounds/battle/sword/sword-2-fast.mp3";
import punch from "@/shared/sounds/battle/punch/punch.mp3";
import miss from "@/shared/sounds/battle/punch/miss.mp3";
import monsterAttack from "@/shared/sounds/battle/monster/female_monster_attacking.mp3";
import monsterGrowl from "@/shared/sounds/battle/monster/female_monster_growls.mp3";

// Shop Sound Effects
import buyItem from "@/shared/sounds/shop/sellitem-coin-drop.mp3";
import sellItem from "@/shared/sounds/shop/sellitem-poker-chip.mp3";

const sword = {
   slow: swordSlashSlow,
   fast: swordSlashFast,
   punch,
   miss,
   monsterAttack,
   monsterGrowl
}

const song = {
   login: loginTheme,
   default: defaultTheme,
   shop: shopTheme,
   hunt: huntTheme,
}

const shop = {
   buyItem,
   sellItem
}

export {
   sword,
   song,
   shop
}
