import Api from "@/service/api";
import KnightFactory from "@/factory/knights";

const prefix = "knights/"

export default {
   create: createKnights,
   find: getKnightById,
   equip: equipItem,
   unequip: unequipItem,
   discardItem: discardItem,
   addPoint: addAttrPoint
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

function unequipItem(payload) {
   return Api.PUT({
      url: prefix + "unequip",
      body: payload
   })
}

function discardItem(payload) {
   return Api.PUT({
      url: prefix + "inventory/discard",
      body: payload
   })
}

function addAttrPoint(payload) {
   return Api.PUT({
      url: prefix + "attr/add",
      body: payload
   })
}
