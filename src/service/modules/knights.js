import Api from "@/service/api";
import KnightFactory from "@/factory/knights";

const prefix = "knights/"
const routes = {
   create: createKnights,
   find: getKnightById
}

export default {
   create: routes.create,
   find: routes.find
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
