import Api from "@/service/api";

const battlePrefix = "hunt/";
const partyPrefix = "party/"

function getRewards(payload) {
   return Api.POST({
      url: battlePrefix + "reward/",
      body: payload
   })
}
function bossReward(payload) {
   return Api.POST({
      url: battlePrefix + "reward/boss/",
      body: payload
   })
}
function huntLevels() {
   return Api.GET({
      url: battlePrefix + "levels",
   })
}
function bosses() {
   return Api.GET({
      url: battlePrefix + "bosses",
   })
}
function createParty() {
   return Api.POST({
      url: partyPrefix + "create/",
   })
}
function joinParty(payload) {
   return Api.POST({
      url: partyPrefix + "join/",
      body: payload
   })
}
function removeParty(payload) {
   return Api.DELETE({
      url: partyPrefix + "remove/",
      body: payload
   })
}
function partyBattle(payload) {
   return Api.POST({
      url: battlePrefix + "battle/",
      body: payload
   })
}
function startBattle(payload) {
   return Api.POST({
      url: battlePrefix + "startBattle/",
      body: payload
   })
}

export default {
   reward: getRewards,
   bossReward,
   huntLevels,
   bosses,
   joinParty,
   createParty,
   removeParty,
   partyBattle,
   startBattle
}
