import Api from "@/service/api";

const prefix = "knights/"
const routes = {
   get: meInfo,
}

export default {
   get: routes.get
}

function meInfo() {
   return Api.GET({
      url: prefix + "login/"
   })
}
