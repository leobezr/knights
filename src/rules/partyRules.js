export default {
   canHuntMonster(level, monsterLevel) {
      const minLevel = Math.floor(monsterLevel / 1.2) || 1;

      return {
         result: !level ? false : level >= minLevel,
         minLevel
      };
   },
   partyShare(highestLevel, lowestLevel) {
      const minLevel = Math.floor(highestLevel / 1.5) || 1;

      return {
         canInvite: lowestLevel > minLevel,
         minLevel
      };
   }
}
