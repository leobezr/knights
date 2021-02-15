export default {
   text: [
      v => !!v && v.length >= 5
   ],
   nickname: [
      v => !!v && v.length >= 4 && v.length < 25 || "Invalid name"
   ],
   email: [
      function (value) {
         const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return re.test(String(value).toLowerCase());
      }
   ]
}
