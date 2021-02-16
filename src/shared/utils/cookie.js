class Cookie {
   /**
   * @param name
   * @param value (null to delete or undefined to get)
   * @param options (domain, expire (in days))
   * @return value or true
   */
   static set(name, value, options) {
      options = options || {};
      if (!value) {
         value = "";
         options.expires = -365;
      } else {
         value = escape(value);
      }
      if (options.expires) {
         var d = new Date();
         d.setDate(d.getDate() + options.expires);
         value += "; expires=" + d.toUTCString();
      }
      if (options.domain) {
         value += "; domain=" + options.domain;
      }
      if (options.path) {
         value += "; path=" + options.path;
      }
      document.cookie = name + "=" + value;
   }
   /**
   * @param name
   * @return value or true
   */
   static get(name) {
      var n, v,
         cookies = document.cookie.split(";");

      for (var i = 0; i < cookies.length; i++) {
         n = cookies[i].trim().substr(0, cookies[i].indexOf("="));
         v = cookies[i].substr(cookies[i].indexOf("=") + 1);
         if (n.includes(name)) {
            return unescape(v);
         }
      }
   }
   static clear() {
      var cookies = document.cookie.split(";");

      for (var i = 0; i < cookies.length; i++) {
         var cookie = cookies[i];
         var eqPos = cookie.indexOf("=");
         var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
         document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
   }
}

export default Cookie
