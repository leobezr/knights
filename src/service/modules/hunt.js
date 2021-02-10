import Api from "@/service/api";

const prefix = "hunt/reward/";

export default {
   reward: getRewards,
   bossReward
}

function getRewards(payload) {
   return Api.POST({
      url: prefix,
      body: payload
   })
}
function bossReward(payload) {
   return Api.POST({
      url: prefix + "boss/",
      body: payload
   })
}
