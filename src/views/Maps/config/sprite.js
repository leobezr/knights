import HealthBar from "@/views/Maps/config/healthbar.js";

export default class {
   constructor(sprite, x, y, canvas, orientation, config) {
      this.canvasProps = canvas;
      this.canvasProps.w = canvas.width;
      this.canvasProps.h = canvas.height;
      this.canvasProps.ctx = this.canvasProps.getContext("2d");

      this.automation = {
         active: config.AI,
         chasing: { x: null, y: null },
      }

      this.enemy = null

      this.movement = {
         attackTurn: true,
         direction: null,
         frame: 0,
         frameCount: sprite.cols,
         locked: false,
         dead: false
      }

      this.sprite = {
         rows: sprite.rows,
         cols: sprite.cols,

         containerW: sprite.width,
         containerH: sprite.height,

         x: 0,
         y: sprite.height * 2,
         h: this.canvasProps.h,

         animation: new Image()
      }
      this.sprite.animation.src = sprite.spritesheet;

      this.player = {
         speed: 25,
         inverted: orientation || false,
         dead: false,

         collision: false,
         attacking: false,

         w: this.sprite.containerW / this.sprite.cols,
         h: this.sprite.containerH / this.sprite.rows,

         hp: sprite.health,
         dmg: sprite.damage,

         x: x,
         y: y
      }

      this.actions = {
         win: config.win,
         lose: config.lose,
      }

      this.healthbar = new HealthBar(this.canvasProps, this.player.x, this.player.y, { hp: this.player.hp, maxHp: this.player.hp });
   }
   /**
    * Health bars
    */
   _renderHP() {
      this.healthbar.render(this.player.x + 20, this.player.y + 230);

      if (this.player.hp <= 0) {
         this._loseBattle();

         if (!this.automation.active) {
            this.actions.lose();
         }
      }
   }
   /**
    * Automated walks around
    */
   _automatedWalk() {
      if (!this.player.collision) {
         const walkLeft = 37; const walkUp = 38;
         const walkRight = 39; const walkDown = 40;

         let movements = [walkLeft, walkUp, walkRight, walkDown];

         const currentX = this.player.x; const currentY = this.player.y;
         const targetX = this.automation.chasing.x; const targetY = this.automation.chasing.y;
         const isNumber = n => !isNaN(n);

         let walkDirection = Math.floor(Math.random() * (4 - 0) + 0);

         // Chasing logic
         if (isNumber(targetX) && isNumber(targetY)) {
            if (currentX != targetX) {
               if (currentX > targetX) {
                  walkDirection = 0
               } else {
                  walkDirection = 2
               }
            } else if (currentY != targetY) {
               if (currentY > targetY) {
                  walkDirection = 1
               } else {
                  walkDirection = 3
               }
            } else {
               this.attack();
            }
         }

         // Start running
         this.move(movements[walkDirection], true)
      } else {
         this.attack();
      }
   }
   /**
    * Clears render before changing picture
    */
   _clearRender() {
      this.canvasProps.ctx.clearRect(this.player.x, this.player.y, this.player.w, this.player.h);
      this.canvasProps.ctx.clearRect(50, 50, 400, 40);
   }
   /**
    * Attack logic
    */
   _attack() {
      if (this.player.dead) return;

      if (this.player.attacking && this.movement.attackTurn) {
         setTimeout(() => {
            this.movement.attackTurn = true
         }, 300);

         this.movement.attackTurn = false;

         setTimeout(() => {
            this.stop()
         }, 100);

         if (this.player.collision && !this.enemy.player.dead) {
            this.canvasProps.ctx.font = "30px Montserrat";
            this.canvasProps.ctx.fillStyle = "red";
            this.canvasProps.ctx.textAlign = "center";
            this.canvasProps.ctx.fillText(this.player.dmg, this.enemy.player.x + 50, this.enemy.player.y);

            let clearSizeX = 400;
            let clearSizeY = 50;

            let clearDirX = this.enemy.player.x - 80
            let clearDirY = this.enemy.player.y - 40

            this.enemy.takeDamage(this.player.dmg);

            if (this.enemy.player.hp <= 0) {
               if (!this.automation.active) {
                  this.actions.win(this.enemy)
               }
            }

            setTimeout(() => this.canvasProps.ctx.clearRect(clearDirX, clearDirY, clearSizeX, clearSizeY), 500);
         }
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
      if (this.player.dead) return;

      switch (direction) {
         case "left":
            this.sprite.y = this.player.inverted ? this.player.h * 4 : this.player.h * 2;
            break;
         case "up":
            this.sprite.y = this.player.h * 3;
            break;
         case "right":
            this.sprite.y = this.player.inverted ? this.player.h * 2 : this.player.h * 4;
            break;
         case "down":
            this.sprite.y = this.player.h * 5;
            break;
      }
   }
   /**
    * Horizontal Walk
    * @param {String} data
    */
   _horizontalWalk(data) {
      if (data == "increment") {
         if (this.player.x < (this.canvasProps.w - this.player.h / 2)) {
            this.player.x += this.player.speed;
         }
      } else {
         if (this.player.x > 0) {
            this.player.x -= this.player.speed;
         }
      }
   }
   /**
    * Vertical Walk
    * @param {String} data
    */
   _verticalWalk(data) {
      if (data == "increment") {
         if (this.player.y < (this.canvasProps.h - this.player.w)) {
            this.player.y += this.player.speed;
         }
      } else {
         if (this.player.y > 0) {
            this.player.y -= this.player.speed;
         }
      }
   }
   /**
    * Private function, update movement
    */
   _move() {
      const DIR = this.movement.direction;

      if (this.player.dead) {
         return;
      }

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
   _dieAnimation() {
      if (this.movement.dead) return;

      if (!this.movement.locked) {
         this.movement.locked = true;
         this.sprite.y = this.player.h * this.sprite.rows;

         this.movement.frame = 0;
         this.movement.frame = ++this.movement.frame % this.movement.frameCount;

         this.sprite.x = this.movement.frame * this.player.w;
      } else if (this.movement.frame < this.movement.frameCount) {
         this.movement.frame = ++this.movement.frame;
         this.sprite.x = this.movement.frame * this.player.w;
      } else {
         this.movement.frame = this.movement.frameCount - 2;
         this.movement.frame = ++this.movement.frame % this.movement.frameCount;

         this.sprite.x = this.movement.frame * this.player.w;
         this.movement.dead = true;
      }
   }
   /**
    * Private function, updates frame
    */
   _updateFrame() {
      if (this.player.dead) {
         this._dieAnimation();
         return;
      }

      this.movement.frame = ++this.movement.frame % this.movement.frameCount;
      this.sprite.x = this.movement.frame * this.player.w;

      if (this.automation.active) {
         this._automatedWalk();
      }
   }
   /**
    * Win Battle
    */
   _loseBattle() {
      this.player.dead = true;
   }

   animate() {
      this._updateFrame();

      this._clearRender();

      this._attack();
      this._move();
      this._renderHP();
   }
   draw() {
      this.canvasProps.ctx.drawImage(
         this.sprite.animation,
         this.sprite.x, this.sprite.y,
         this.player.w, this.player.h,
         this.player.x, this.player.y,
         this.player.w, this.player.h
      );
   }
   move(keyCode, automated) {
      let movementDirection = this._readKeyCode(keyCode);

      if (this.automation.active && !automated) {
         return;
      }

      if (keyCode == 32) {
         this.attack();
         return;
      }
      this._setMovement(movementDirection);
      this.movement.direction = movementDirection;
   }
   attack() {
      if (this.player.dead) return;

      this.sprite.y = 0;
      this.player.attacking = true;
   }
   stop() {
      if (this.player.dead) return;

      this.sprite.y = this.player.h;
      this.movement.direction = null;
      this.player.attacking = false;
   }
   fight({ target }) {
      this.enemy = target;
   }
   takeDamage(damage) {
      if (this.player.hp > 0) {
         this.player.hp -= damage;

         if (this.player.hp <= 0) {
            this.player.hp = 0;
         }
      }
      this.healthbar.reduce(this.player.hp);
   }

   /**
    * Method only for monsters
    */
   chase({ x, y }) {
      this.automation.chasing = { x, y };
   }
   colliding(isColliding) {
      this.player.collision = isColliding;
   }
}
