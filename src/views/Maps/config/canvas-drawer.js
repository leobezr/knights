import Sprite from "@/views/Maps/config/sprite.js";
import SpritePack from "@/views/Maps/spritePack/sprite-pack.js";

export default class {
   constructor(props) {
      this.canvas = props.$canvas;
      this.ctx = this.canvas.getContext("2d");

      this.character = new Sprite({ ...SpritePack.players.hero }, { canvas: this.canvas });

      this.runGame();
   }
   _updateFrame() {
      this._attack();

      this.character.movement.frame = ++this.character.movement.frame % this.character.movement.frameCount;
      this.character.sprite.x = this.character.movement.frame * this.character.player.w;

      this.ctx.clearRect(this.character.player.x, this.character.player.y, this.character.player.w, this.character.player.h);
      this._move();
   }
   _attack() {
      if (this.character.movement.attackTurn == 4) {
         this.character.sprite.y = this.character.player.h;
      }
      this.character.movement.attackTurn++;
   }
   _horizontalWalk(data) {
      if (data == "increment") {
         if (this.character.player.x < (this.character.canvasProps.w - this.character.player.h / 2)) {
            this.character.player.x += this.character.player.speed;
         }
      } else {
         if (this.character.player.x > 0) {
            this.character.player.x -= this.character.player.speed;
         }
      }
   }
   _verticalWalk(data) {
      if (data == "increment") {
         if (this.character.player.y < (this.character.canvasProps.h - this.character.player.w)) {
            this.character.player.y += this.character.player.speed;
         }
      } else {
         if (this.character.player.y > 0) {
            this.character.player.y -= this.character.player.speed;
         }
      }
   }
   _move() {
      const DIR = this.character.movement.direction;
      if (DIR) {
         switch (DIR) {
            case "left":
               this._horizontalWalk("setback");
               break
            case "up":
               this._verticalWalk("setback");
               break
            case "right":
               this._horizontalWalk("increment");
               break
            case "down":
               this._verticalWalk("increment");
               break
         }
      }
   }
   _setCharDir({ right, left }) {
      this.character.right = right || false;
      this.character.left = left || false;
   }
   _drawAnimation() {
      this._updateFrame();

      this.ctx.drawImage(
         this.character.sprite.animation,
         this.character.sprite.x, this.character.sprite.y,
         this.character.player.w, this.character.player.h,
         this.character.player.x, this.character.player.y,
         this.character.player.w, this.character.player.h
      );
   }
   attack() {
      this.character.attack();
   }
   move(keyCode) {
      this.character.move(keyCode);
   }
   stop() {
      this.character.stop()
   }

   /**
    * New methods
    */
   runGame() {
      setInterval(this._drawAnimation.bind(this), this.character.intervalSpeed);
   }
}
