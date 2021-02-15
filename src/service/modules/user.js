import Api from "@/service/api";

const prefix = "user/"

function login(payload) {
   return Api.POST({
      url: prefix + "login/",
      body: payload
   })
}
function create(payload) {
   return Api.POST({
      url: prefix + "create/",
      body: payload
   })
}
function validateEmail(emailId) {
   return Api.PUT({
      url: prefix + "verify/" + emailId
   })
}
function getUserData() {
   return Api.GET({
      url: prefix + "profile/"
   })
}
function getCharList() {
   return Api.GET({
      url: prefix + "char-list/"
   })
}

export default {
   login,
   create,
   validateEmail,
   getUserData,
   getCharList
}
