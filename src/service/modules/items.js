import Api from "@/service/api";

const prefix = "items/"

export default {
   get: getItemGallery,
   sell: sellItem,
   buy: buyItem
}

function getItemGallery() {
   return Api.GET({
      url: prefix
   })
}

function sellItem(payload) {
   return Api.POST({
      url: prefix + "sell",
      body: payload
   })
}

function buyItem(payload) {
   return Api.POST({
      url: prefix + "buy",
      body: payload
   })
}

