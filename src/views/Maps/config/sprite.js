export default class {
   constructor(sprite, { canvas }) {
      this.intervalSpeed = 80;

      /**
       * New class structure
       */
      this.canvasProps = {
         w: canvas.width,
         h: canvas.height
      }
      this.movement = {
         attackTurn: 0,
         direction: null,
         frame: 0,
         frameCount: sprite.cols
      }
      this.sprite = {
         rows: sprite.rows,
         cols: sprite.cols,

         containerW: 700,
         containerH: 1483,

         x: 0,
         h: this.canvasProps.h,

         animation: new Image()
      }
      this.sprite.animation.src = sprite.bg;

      this.player = {
         speed: 45,

         w: this.sprite.containerW / this.sprite.cols,
         h: this.sprite.containerH / this.sprite.rows,

         x: 300,
         y: 400
      }
   }
   /**
    * Private Function, acts as a getter
    * @param {Number} keyCode
    * @returns {String} -> directionValue
    */
   _readKeyCode(keyCode) {
      const keyCodeLeft = [37, 65];
      const keyCodeUp = [38, 87];
      const keyCodeRight = [39, 68];
      const keyCodeDown = [40, 83];

      if (keyCodeLeft.includes(keyCode)) {
         return "left";
      } else if (keyCodeUp.includes(keyCode)) {
         return "up";
      } else if (keyCodeRight.includes(keyCode)) {
         return "right";
      } else if (keyCodeDown.includes(keyCode)) {
         return "down";
      } else {
         return null;
      }
   }
   /**
    * Private change movement config
    * @param {String} direction
    */
   _setMovement(direction) {
      switch (direction) {
         case "left":
            this.sprite.y = this.player.h * 2;
            break;
         case "up":
            this.sprite.y = this.player.h * 3;
            break;
         case "right":
            this.sprite.y = this.player.h * 4;
            break;
         case "down":
            this.sprite.y = this.player.h * 5;
            break;
      }
   }

   move(keyCode) {
      let movementDirection = this._readKeyCode(keyCode);

      if (keyCode == 32) {
         this.attack();
         return;
      }
      this._setMovement(movementDirection);
      this.movement.direction = movementDirection;
   }
   attack() {
      this.sprite.y = 0;
      this.movement.attackTurn = 0;
   }
   stop() {
      this.sprite.y = this.player.h;
      this.movement.direction = null;
   }
}
