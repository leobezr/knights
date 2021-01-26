import Api from "@/service/api";

const prefix = "hunt/reward";

export default {
   reward: getRewards,
}

function getRewards(payload) {
   return Api.POST({
      url: prefix,
      body: payload
   })
}
