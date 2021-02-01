import Konva from "konva";
import Controller from "@/views/HuntingGround.vue/shared/utils/controller.js";

export default class {
   constructor(props) {
      this.player = null;

      this.config = {
         sprite: props.spritesheet,
         h: props.spriteProp.height / props.spriteProp.rows,
         w: props.spriteProp.width / props.spriteProp.cols,
         container: props.container,
         layer: props.layer
      }

      const stats = props.spriteProp.stats;

      this.stats = {
         hp: stats.attributes.hp,
         damage: stats.attributes.hit,
         def: stats.attributes.def,
         agi: Math.floor(stats.attributes.agi + stats.modifier.agi),
         speed: Math.floor((stats.attributes.agi + stats.modifier.agi) * .065)
      }

      this.controller = null;
   }
   _setControles() {
      this.controller = new Controller();

      this._movementController();
      this._attackController();
   }
   _attackController() {
      let loop = null;

      const attackFn = () => {
         const SPEED = this.stats.speed <= 10 ? 10 : this.stats.speed >= 75 ? 75 : this.stats.speed;
         const ATTACK_SPEED = Math.round(7 * (1000 / SPEED));

         this.player.animation("attacking");
         this.player.frameRate(SPEED);

         clearInterval(loop);
         loop = setInterval(() => {

            console.log({ attacking: ATTACK_SPEED });
         }, ATTACK_SPEED);
      }
      const attackReleaseFn = () => {
         this.player.animation("standing");
         this.player.frameRate(12);

         clearInterval(loop);
      }

      this.controller.onClick(attackFn);
      this.controller.onSpace(attackFn);

      this.controller.onClickRelease(attackReleaseFn);
      this.controller.onSpaceRelease(attackReleaseFn);
   }
   _movementController() {
      let containerMaxWidth = this.config.container.offsetWidth;
      let containerMaxHeight = this.config.container.offsetHeight;

      const SPEED = this.stats.speed <= 10 ? 10 : this.stats.speed >= 75 ? 75 : this.stats.speed;

      this.controller.onUp(() => {
         let playerPosY = this.player.y();

         this.player.frameRate(12);
         this.player.animation("walkingUp");

         if (playerPosY >= 0) {
            this.player.y(playerPosY - SPEED);
         } else {
            this.player.y(0);
         }
      })
      this.controller.onDown(() => {
         let playerPosY = this.player.y();

         this.player.frameRate(12);
         this.player.animation("walkingDown");

         if (playerPosY <= (containerMaxHeight - 120)) {
            this.player.y(playerPosY + SPEED);
         } else {
            this.player.y(containerMaxHeight - 120);
         }
      })
      this.controller.onRight(() => {
         let playerPosX = this.player.x();

         this.player.frameRate(12);
         this.player.animation("walkingRight");

         if (playerPosX < (containerMaxWidth - 120)) {
            this.player.x(playerPosX + SPEED);
         } else {
            this.player.x(containerMaxWidth - 120);
         }
      })
      this.controller.onLeft(() => {
         let playerPosX = this.player.x();

         this.player.frameRate(12);
         this.player.animation("walkingLeft");

         if (playerPosX >= 0) {
            this.player.x(playerPosX - SPEED);
         } else {
            this.player.x(0);
         }
      })
      this.controller.onRelease(() => {
         this.player.frameRate(12);
         this.player.animation("standing");
      })
   }
   init() {
      return new Promise(resolve => {
         const imageObj = new Image();

         imageObj.onload = function () {
            const spriteH = parseInt(this.config.h);
            const spriteW = parseInt(this.config.w);

            const spriteOffset = spriteW;

            this.player = new Konva.Sprite({
               x: 50,
               y: 50,
               image: imageObj,
               animation: "standing",
               animations: {
                  standing: [
                     0, spriteH, spriteW, spriteH,
                     spriteOffset, spriteH, spriteW, spriteH,
                     spriteOffset * 2, spriteH, spriteW, spriteH,
                     spriteOffset * 3, spriteH, spriteW, spriteH,
                     spriteOffset * 4, spriteH, spriteW, spriteH,
                     spriteOffset * 5, spriteH, spriteW, spriteH,
                     spriteOffset * 6, spriteH, spriteW, spriteH,
                     spriteOffset * 7, spriteH, spriteW, spriteH,
                  ],
                  attacking: [
                     0, 0, spriteW, spriteH,
                     spriteOffset, 0, spriteW, spriteH,
                     spriteOffset * 2, 0, spriteW, spriteH,
                     spriteOffset * 3, 0, spriteW, spriteH,
                     spriteOffset * 4, 0, spriteW, spriteH,
                     spriteOffset * 5, 0, spriteW, spriteH,
                     spriteOffset * 6, 0, spriteW, spriteH,
                     spriteOffset * 7, 0, spriteW, spriteH,
                  ],
                  walkingLeft: [
                     0, spriteH * 2, spriteW, spriteH,
                     spriteOffset, spriteH * 2, spriteW, spriteH,
                     spriteOffset * 2, spriteH * 2, spriteW, spriteH,
                     spriteOffset * 3, spriteH * 2, spriteW, spriteH,
                     spriteOffset * 4, spriteH * 2, spriteW, spriteH,
                     spriteOffset * 5, spriteH * 2, spriteW, spriteH,
                     spriteOffset * 6, spriteH * 2, spriteW, spriteH,
                     spriteOffset * 7, spriteH * 2, spriteW, spriteH,
                  ],
                  walkingUp: [
                     0, spriteH * 3, spriteW, spriteH,
                     spriteOffset, spriteH * 3, spriteW, spriteH,
                     spriteOffset * 2, spriteH * 3, spriteW, spriteH,
                     spriteOffset * 3, spriteH * 3, spriteW, spriteH,
                     spriteOffset * 4, spriteH * 3, spriteW, spriteH,
                     spriteOffset * 5, spriteH * 3, spriteW, spriteH,
                     spriteOffset * 6, spriteH * 3, spriteW, spriteH,
                     spriteOffset * 7, spriteH * 3, spriteW, spriteH,
                  ],
                  walkingRight: [
                     0, spriteH * 4, spriteW, spriteH,
                     spriteOffset, spriteH * 4, spriteW, spriteH,
                     spriteOffset * 2, spriteH * 4, spriteW, spriteH,
                     spriteOffset * 3, spriteH * 4, spriteW, spriteH,
                     spriteOffset * 4, spriteH * 4, spriteW, spriteH,
                     spriteOffset * 5, spriteH * 4, spriteW, spriteH,
                     spriteOffset * 6, spriteH * 4, spriteW, spriteH,
                     spriteOffset * 7, spriteH * 4, spriteW, spriteH,
                  ],
                  walkingDown: [
                     0, spriteH * 5, spriteW, spriteH,
                     spriteOffset, spriteH * 5, spriteW, spriteH,
                     spriteOffset * 2, spriteH * 5, spriteW, spriteH,
                     spriteOffset * 3, spriteH * 5, spriteW, spriteH,
                     spriteOffset * 4, spriteH * 5, spriteW, spriteH,
                     spriteOffset * 5, spriteH * 5, spriteW, spriteH,
                     spriteOffset * 6, spriteH * 5, spriteW, spriteH,
                     spriteOffset * 7, spriteH * 5, spriteW, spriteH,
                  ],
                  die: [
                     0, spriteH * 6, spriteW, spriteH,
                     spriteOffset, spriteH * 6, spriteW, spriteH,
                     spriteOffset * 2, spriteH * 6, spriteW, spriteH,
                     spriteOffset * 3, spriteH * 6, spriteW, spriteH,
                     spriteOffset * 4, spriteH * 6, spriteW, spriteH,
                     spriteOffset * 5, spriteH * 6, spriteW, spriteH,
                     spriteOffset * 6, spriteH * 6, spriteW, spriteH,
                     spriteOffset * 7, spriteH * 6, spriteW, spriteH,
                     spriteOffset * 7, spriteH * 6, spriteW, spriteH,
                  ],
               },
               frameRate: 12,
               frameIndex: 0
            });

            this._setControles();
            resolve(this.player);
         }.bind(this);

         imageObj.src = this.config.sprite;
      })
   }
}
