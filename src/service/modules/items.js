import Api from "@/service/api";

const prefix = "items/"
const routes = {
   get: getItemGallery,
}

export default {
   getGallery: routes.get
}

function getItemGallery() {
   return Api.GET({
      url: prefix
   })
}
