export default class {
   constructor(eventBus) {
      this._onLeft = () => { };
      this._onUp = () => { };
      this._onRight = () => { };
      this._onDown = () => { };

      this._onRelease = () => { };
      this._onClickRelease = () => { };
      this._onSpaceRelease = () => { };

      this._onSpace = () => { }
      this._onClick = () => { }


      this.eventStore = eventBus;

      window.addEventListener("keydown", this.setEvent.bind(this));
      window.addEventListener("keyup", this.setRelease.bind(this));

      window.addEventListener("mousedown", this.setClick.bind(this));
      window.addEventListener("mouseup", this.removeClick.bind(this));


      this.walking = false;
      this._repeater = null;
      this.lastDir = null;
   }
   _clearCache() {
      this.walking = false;
      this.lastDir = null;

      clearInterval(this._repeater);
   }
   _setDir(cb) {
      this.walking = true;
      this.lastDir = cb;

      this.repeater();
   }
   setEvent(e) {
      const CODE = e.keyCode;

      if (CODE == 38 || CODE == 87) {
         this._onUp.call();
      } else if (CODE == 39 || CODE == 68) {
         this._onRight.call();
      } else if (CODE == 40 || CODE == 83) {
         this._onDown.call();
      } else if (CODE == 37 || CODE == 65) {
         this._onLeft.call();
      } else if (CODE == 32) {
         this._onSpace.call();
      }
   }
   setRelease() {
      this._onRelease.call();
   }
   setClick() {
      this._onClick.call();
   }
   removeClick() {
      this._onClickRelease.call();
   }

   onLeft(cb) {
      this._onLeft = () => {
         this._clearCache();
         this._setDir(cb);

         cb.call()
      };
   }
   onUp(cb) {
      this._onUp = () => {
         this._clearCache();
         this._setDir(cb);

         cb.call()
      };
   }
   onRight(cb) {
      this._onRight = () => {
         this._clearCache();
         this._setDir(cb);

         cb.call()
      };
   }
   onDown(cb) {
      this._onDown = () => {
         this._clearCache();
         this._setDir(cb);

         cb.call()
      };
   }

   onRelease(cb) {
      this._onRelease = () => {
         this._clearCache();

         cb.call()
      };
   }
   onClickRelease(cb) {
      this._onClickRelease = () => {
         this._clearCache();

         cb.call();
      }
   }
   onSpaceRelease(cb) {
      this._onClickRelease = () => {
         this._clearCache();

         cb.call();
      }
   }

   onSpace(cb) {
      this._onSpace = () => {
         this._clearCache();

         cb.call();
      }
   }
   onClick(cb) {
      this._onClick = () => {
         this._clearCache();

         cb.call();
      }
   }

   repeater() {
      this._repeater = setInterval(() => {
         if (this.walking) {
            this.lastDir.call()
         }
      }, 100)
   }
}
