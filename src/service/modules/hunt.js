import Api from "@/service/api";

const prefix = "hunt/";

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

export default {
   reward: getRewards,
   bossReward,
   huntLevels,
   bosses
}
