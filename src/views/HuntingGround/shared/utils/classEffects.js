import vocationMechanics from "@/shared/mechanics/vocationMechanics.js";
import ArrowSprite from "@/views/HuntingGround/shared/sprites/effects/arrow.png";
import clamp from "@/shared/utils/clamp.js";
import Konva from "konva";

export default class {
   constructor(props) {
      this.profile = {
         vocation: props.vocation,
         player: props.player,
         playerRange: props.playerRange,
         radiusRange: vocationMechanics[props.vocation].baseRange + props.playerRange
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
   async _addMouseEvent() {
      this.events.archerMouseMove = {
         name: "mousemove",
         fn: e => {
            this.events.mousePosition = {
               x: e.screenX,
               y: e.screenY
            }
         }
      }
      let canvas = await this._findCanvas();
      canvas.addEventListener(this.events.archerMouseMove.name, this.events.archerMouseMove.fn);
      return;
   }
   /**
    *
    * Archer effects
    *
    * The archer throws a collision box at the directed point
    * It is limited to archer range
    */
   async _archerEffect() {
      await this._addMouseEvent();

      let playPos = this.profile.player.location();

      let arrowSprite = new Image();
      arrowSprite.src = ArrowSprite;

      let collisionBox = new Konva.Rect({
         x: playPos.x / 2,
         y: playPos.y / 2,
         width: 150,
         height: 150,
         strokeWidth: 4,
      })
      this.spriteController.arrow = new Konva.Image({
         x: playPos.x + (this.profile.player.body.width() / 2) - 72,
         y: playPos.y + (this.profile.player.body.height() / 2) - 48,
         width: 150,
         height: 150,
         image: arrowSprite,
         offset: {
            x: 75,
            y: 75
         }
      })
      this.box = new Konva.Group({
         x: playPos.x / 2,
         y: playPos.y / 2,
         width: 150,
         height: 150
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
         this._fixArrowAngle();

         let clickX = this.events.mousePosition.x - 150;
         let clickY = this.events.mousePosition.y - 180;

         let playerPosition = this.profile.player.location();
         let playerX = playerPosition.x;
         let playerY = playerPosition.y;

         let radius = this.profile.radiusRange - 80;

         let clampPos = clamp(clickX, clickY, playerX, playerY, radius);

         this._sendArrow(playerX, playerY, clampPos.x, clampPos.y);
         this.animated();
      }
   }
   _sendArrow(playerX, playerY, targetX, targetY) {
      this.box.x(playerX); this.box.y(playerY);
      this.box.to({ x: targetX, y: targetY, duration: .05 });

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
    *
    * The knight has an area hit of 1x3
    * It should change direction based on XY direction relative to the player position
    *
    * MousePosX < PlayerX = Left
    * MousePosX > PlayerX = Right
    * and so on...
    */
   async _knightEffect() {
      await this._addMouseEvent();

      let playPos = this.profile.player.location();
      this.box = new Konva.Circle({
         x: playPos.x,
         y: playPos.y,
         fill: "rgba(32, 0, 0, .25)",
         stroke: "rgba(0,0,0, .4)",
         radius: 20,
         offset: {
            x: -70,
            y: -80
         }
      })

      this.animationReady = true;

      this._knightUpdateBoxPosition();
      this.animated(false);
   }
   _getSwordDirection() {
      if (!this.events.mousePosition) return;
      this.box.opacity(0);

      let mouseX = this.events.mousePosition.x - 150;
      let mouseY = this.events.mousePosition.y - 180;

      let playerX = this.profile.player.location().x + (this.profile.player.body.width() / 2) - 70;
      let playerY = this.profile.player.location().y + (this.profile.player.body.height() / 2) - 40;

      let radius = this.profile.radiusRange;

      let distance = ((playerX - mouseX) * (playerX - mouseX) + (playerY - mouseY) * (playerY - mouseY));
      let area = radius * radius

      if (distance <= area) {
         this.box.opacity(1);
         return { x: mouseX, y: mouseY }
      }

      return { x: 0, y: 0 }
   }
   _knightUpdateBoxPosition() {
      if (!this.animationReady) return;

      let swordDir = this._getSwordDirection();
      if (!swordDir) return;

      let playPos = this.profile.player.location();

      this.box.fillPatternRepeat('repeat-x');
      this.box.x(playPos.x);
      this.box.y(playPos.y);

      this.box.to({ x: swordDir.x, y: swordDir.y, duration: 0 })
      this.animated();
   }
   /**
    * Public Method, append to Konva layer
    * @param {*} layer - Konva layer
    * @param {*} cb - callback
    */
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

   /**
    * Public Method, animate box sprite
    * when true, box visible
    * when false, box invisible
    * @param {*} bool
    */
   animated(bool) {
      bool = bool ?? true;
      if (this.profile.vocation == "archer");

      this.box.visible(bool);
   }

   /**
    * Public Method, removes all events stored (called before destroying)
    * name: eventName, fn: eventFunction
    */
   destroy() {
      if (Object.values(this.events).length) {
         for (let event in this.events) {
            window.removeEventListener(event.name, event.fn);
         }
      }
   }

   /**
    * Public Method, frame speed setter
    * 12 is default
    * @param {*} num
    */
   frameSpeed(num) {
      if (!this.animationReady) return;

      this.box.frameRate(num);
   }
   /**
    * Public Method, draw image
    */
   updateFrame() {
      this._drawFrame();
   }
}
