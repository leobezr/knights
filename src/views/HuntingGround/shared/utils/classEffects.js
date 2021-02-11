import WindEffct from "@/views/HuntingGround/shared/sprites/effects/wind-blow-big.png"
import ArrowSprite from "@/views/HuntingGround/shared/sprites/effects/arrow.png";
import Konva from "konva";

export default class {
   constructor(props) {
      this.profile = {
         vocation: props.vocation,
         player: props.player,
         playerRange: props.playerRange,
         radiusRange: props.playerRange + 300
      }

      this.box = null;
      this.animationReady = false;
      this.events = {}

      this._drawFrame = () => { }
      this._delegateEffect();

      this.spriteController = {
         arrow: null
      }

      this.canvasControllers = {
         layer: null
      }
   }
   _delegateEffect() {
      switch (this.profile.vocation) {
         case "knight":
         case "swordman":
            this._knightEffect()
            this._drawFrame = this._knightUpdateBoxPosition;
            break;
         case "archer":
            this._archerEffect();
            this._drawFrame = this._archerUpdateBoxPosition;
         default:
            return 0
      }
   }
   _findCanvas() {
      let maxCounter = 10;
      let counter = 0;

      return new Promise((resolve, reject) => {
         let searchCanvas = setTimeout(() => {
            let canvas = document.querySelector("canvas");
            counter++;

            if (canvas) {
               resolve(canvas);
            } else {
               if (counter >= maxCounter) {
                  reject(`Did not find canvas, at ${maxCounter} tries.`);
               }
               searchCanvas();
            }
         }, 100);
      })
   }
   /**
    *
    * Archer effects
    */
   async _archerEffect() {
      this.events.archerMouseMove = {
         name: "mousemove",
         fn: e => {
            this.events.mousePosition = {
               x: e.screenX,
               y: e.screenY
            }
         }
      }
      let playPos = this.profile.player.location();

      let canvas = await this._findCanvas();
      canvas.addEventListener(this.events.archerMouseMove.name, this.events.archerMouseMove.fn);

      let arrowSprite = new Image();
      arrowSprite.src = ArrowSprite;

      let collisionBox = new Konva.Rect({
         x: playPos.x / 2,
         y: playPos.y / 2,
         width: 200,
         height: 200,
         strokeWidth: 4,
      })
      this.spriteController.arrow = new Konva.Image({
         x: collisionBox.x() + 200,
         y: collisionBox.y() + 125,
         width: 200,
         height: 44,
         image: arrowSprite
      })
      this.box = new Konva.Group({
         x: playPos.x / 2,
         y: playPos.y / 2,
         width: 200,
         height: 200
      })

      this.box.add(collisionBox);
      this.box.add(this.spriteController.arrow);

      this.animated(false);
      this.animationReady = true;
   }
   _fixArrowAngle() {
      let playPos = this.profile.player.location();
      let trueClickPositionX = this.events.mousePosition.x - 150;
      let trueClickPositionY = this.events.mousePosition.y - 180;

      const toDegrees = v => v * (180 / Math.PI);

      let degree = toDegrees(Math.atan2(playPos.y - trueClickPositionY, playPos.x - trueClickPositionX));
      this.spriteController.arrow.rotation(degree);
   }
   _archerUpdateBoxPosition() {
      if (this.events.mousePosition) {
         this._fixArrowAngle()
         let trueClickPositionX = this.events.mousePosition.x - 150;
         let trueClickPositionY = this.events.mousePosition.y - 180;

         let playerPosition = this.profile.player.location();
         let posX = playerPosition.x;
         let posY = playerPosition.y;

         let radiusAttackRange = this.profile.radiusRange;

         let radii = Math.sqrt(Math.pow((trueClickPositionX - posX), 2) + Math.pow((trueClickPositionY - posY), 2));

         if (radii < radiusAttackRange) {
            this._sendArrow(posX, posY, trueClickPositionX, trueClickPositionY);
         } else {
            this.box.x((100 + this.profile.playerRange) * -1);
            this.box.y((100 + this.profile.playerRange) * -1);
         }

         this.animated();
      }
   }
   _sendArrow(playerX, playerY, targetX, targetY) {
      this.box.x(playerX); this.box.y(playerY);
      this.box.to({ x: targetX, y: targetY, duration: .03 });

      let counter = 0;
      let checkArrowPosition = setInterval(function () {
         if (this.box.x() == targetX && this.box.y() == targetY || counter == 200) {
            clearInterval(checkArrowPosition);
            this.animated(false);
         }
         counter++;
      }.bind(this))
   }
   /**
    *
    * Knight effects
    */
   _knightEffect() {
      let playPos = this.profile.player.location();
      let collisionBoxWidth = 100 + this.profile.playerRange;

      let spriteFrameWidth = 225;
      let maxGridCount = Math.round(collisionBoxWidth / spriteFrameWidth);
      let gridSize = spriteFrameWidth * maxGridCount;

      const windBlow = new Image();

      windBlow.onload = function () {
         this.box = new Konva.Sprite({
            x: playPos.x,
            y: playPos.y,
            width: collisionBoxWidth,
            image: windBlow,
            height: 680,
            animation: "effect",
            animations: {
               effect: [
                  0, 0, gridSize, 480,
                  225, 0, gridSize, 480,
                  450, 0, gridSize, 480,
                  675, 0, gridSize, 480,
               ],
            },
            frameRate: 12,
            frameIndex: 0
         })

         this.animationReady = true;

         this._knightUpdateBoxPosition();
         this.animated(false);
      }.bind(this);

      windBlow.src = WindEffct;
   }
   _knightUpdateBoxPosition() {
      if (!this.animationReady) return;

      let playPos = this.profile.player.location();
      let collisionBoxWidth = 100 + this.profile.playerRange - 50;

      this.box.fillPatternRepeat('repeat-x');
      this.box.x(playPos.x - collisionBoxWidth);
      this.box.y(playPos.y - 60);

      this.animated();
   }
   appendTo(layer, cb) {
      const BUFFER = setInterval(function () {
         if (!this.animationReady) return;

         this.canvasControllers.layer = layer;
         this.canvasControllers.layer.add(this.box);

         if (this.box.start) {
            this.box.start();
         }

         cb.call();

         clearInterval(BUFFER);
      }.bind(this))
   }
   animated(bool) {
      bool = bool ?? true;
      if (this.profile.vocation == "archer");

      this.box.visible(bool);
   }
   destroy() {
      if (Object.values(this.events).length) {
         for (let event in this.events) {
            window.removeEventListener(event.name, event.fn);
         }
      }
   }
   frameSpeed(num) {
      if (!this.animationReady) return;

      this.box.frameRate(num);
   }
   updateFrame() {
      this._drawFrame();
   }
}
