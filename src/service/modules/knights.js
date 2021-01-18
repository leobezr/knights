import Api from "@/service/api";
import KnightFactory from "@/factory/knights";

const prefix = "knights/"

export default {
   create: createKnights,
   find: getKnightById,
   equip: equipItem
}

function createKnights(payload) {
   payload = payload || {};

   return Api.POST({
      url: prefix + "create/",
      body: {
         ...KnightFactory({ ...payload })
      }
   })
}

function getKnightById(payload) {
   payload = payload || 0;

   return Api.GET({
      url: prefix + payload
   })
}

function equipItem(payload) {
   return Api.PUT({
      url: prefix + "equip",
      body: payload
   })
}
