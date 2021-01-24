import characterSheet from "@/views/Maps/character/knight-attack-sheet_GG.png";

export default class {
   constructor(props) {
      this.canvas = props.$canvas;
      this.ctx = this.canvas.getContext("2d");

      this.character = {};

      this._drawCharacter({ characterSheet, frames: 5 });
   }
   _updateFrame() {
      const CHAR = this.character;
      let { x, y, width, height } = CHAR;

      this._attack();

      CHAR.curFrame = ++CHAR.curFrame % CHAR.frameCount;
      CHAR.srcX = CHAR.curFrame * CHAR.width;

      this.ctx.clearRect(x, y, width, height);
      this._move();
   }
   _attack() {
      if (this.character.attackTurn == 3) {
         this.character.srcY = this.character.height;
      }
      this.character.attackTurn++;
   }
   _horizontalWalk(data) {
      if (data == "increment") {
         if (this.character.x < (this.character.canvasWidth - this.character.height / 2)) {
            this.character.x += this.character.speed;
         }
      } else {
         if (this.character.x > 0) {
            this.character.x -= this.character.speed;
         }
      }
   }
   _verticalWalk(data) {
      if (data == "increment") {
         if (this.character.y < (this.character.canvasHeight  - this.character.width)) {
            this.character.y += this.character.speed;
         }
      } else {
         if (this.character.y > 0) {
            this.character.y -= this.character.speed;
         }
      }
   }
   _move() {
      const DIR = this.character.movementDirection;
      console.log(this.character.x);

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
   _readKeyCode(keyCode) {
      const keyCodeLeft = 37;
      const keyCodeUp = 38;
      const keyCodeRight = 39;
      const keyCodeDown = 40;

      if (keyCodeLeft == keyCode) {
         return "left";
      } else if (keyCodeUp == keyCode) {
         return "up";
      } else if (keyCodeRight == keyCode) {
         return "right";
      } else if (keyCodeDown == keyCode) {
         return "down";
      } else {
         return null;
      }
   }
   _setMovement(direction) {
      switch (direction) {
         case "left":
            this.character.srcY = this.character.height * 2;
            break;
         case "up":
            this.character.srcY = this.character.height * 3;
            break;
         case "right":
            this.character.srcY = this.character.height * 4;
            break;
         case "down":
            this.character.srcY = this.character.height * 5;
            break;
      }
   }
   _setCharDir({ right, left }) {
      this.character.right = right || false;
      this.character.left = left || false;
   }
   _drawAnimation() {
      const CHAR = this.character;

      this._updateFrame();
      this.ctx.drawImage(CHAR.sprite, CHAR.srcX, CHAR.srcY, CHAR.width, CHAR.height, CHAR.x, CHAR.y, CHAR.width, CHAR.height);
   }
   _drawCharacter({ characterSheet, frames }) {
      const CHAR = this.character;

      CHAR.intervalSpeed = 65;

      CHAR.canvasWidth = this.canvas.width;
      CHAR.canvasHeight = this.canvas.height;

      CHAR.spriteWidth = 700;
      CHAR.spriteHeight = 1483;

      CHAR.attackTurn = 0;
      CHAR.movementDirection = null;

      CHAR.rows = 6;
      CHAR.cols = frames;

      CHAR.width = CHAR.spriteWidth / CHAR.cols;
      CHAR.height = CHAR.spriteHeight / CHAR.rows;

      CHAR.curFrame = 0;
      CHAR.frameCount = frames;

      CHAR.x = 300;
      CHAR.y = 400;

      CHAR.srcX = 0;
      CHAR.srcY = CHAR.height;

      CHAR.left = false;
      CHAR.right = true;

      CHAR.speed = 30;

      CHAR.canvas = this.canvas;

      CHAR.ctx = this.ctx;

      CHAR.sprite = new Image();
      CHAR.sprite.src = characterSheet;

      setInterval(this._drawAnimation.bind(this), CHAR.intervalSpeed);
   }
   attack() {
      this.character.srcY = 0;
      this.character.attackTurn = 0;
   }
   move(keyCode) {
      const direction = this._readKeyCode(keyCode);

      this._setMovement(direction);
      this.character.movementDirection = direction;
   }
   stop() {
      this.character.srcY = this.character.height;
      this.character.movementDirection = null;
   }
}
