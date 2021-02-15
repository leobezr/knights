export default new function () {
   this.session = null;

   this._storeLocalSession = (id) => {
      const CHAR_TOKEN = id;

      localStorage.charToken = CHAR_TOKEN;
   }
   this._storeLocalData = (name, prop) => {
      localStorage.setItem(name, JSON.stringify(prop));
   }
   this._readLocalSession = () => {
      const CHAR_TOKEN = localStorage.charToken;

      if (CHAR_TOKEN) {
         this.session = CHAR_TOKEN
      } else {
         this.session = null;
      }
   }

   this.fetchSession = () => {
      this._readLocalSession();

      if (!this.session) {
         localStorage.clear();
      }
      return this.session;
   }
   this.startNewSession = (id) => {
      this._storeLocalSession(id);
      this._readLocalSession();

      if (this.session) {
         return this.fetchSession();
      } else {
         return false
      }
   }
   this.clear = () => {
      localStorage.clear();
      this._readLocalSession();
   };
}
