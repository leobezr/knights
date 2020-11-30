export default new function () {
   this.session = null;

   this._storeLocalSession = (id) => {
      const SESSION_ID = id;

      localStorage.sessionId = SESSION_ID;
   }
   this._storeLocalData = (name, prop) => {
      localStorage.setItem(name, JSON.stringify(prop));
   }
   this._readLocalSession = () => {
      const SESSION_ID = localStorage.sessionId;

      if (SESSION_ID) {
         this.session = SESSION_ID
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
