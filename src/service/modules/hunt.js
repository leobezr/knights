import Api from "@/service/api";

const prefix = "hunt/";
const partyPrefix = "party/"

function getRewards(payload) {
   return Api.POST({
      url: prefix + "reward/",
      body: payload
   })
}
function bossReward(payload) {
   return Api.POST({
      url: prefix + "reward/boss/",
      body: payload
   })
}
function huntLevels() {
   return Api.GET({
      url: prefix + "levels",
   })
}
function bosses() {
   return Api.GET({
      url: prefix + "bosses",
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

export default {
   reward: getRewards,
   bossReward,
   huntLevels,
   bosses,
   joinParty,
   createParty,
   removeParty
}
