import numberPack from "@/views/HuntingGround/shared/utils/numberPack.js";
import Konva from "konva";

export default class {
   constructor(props) {
      this.core = props.core;

      this.config = props.config;
      this.avatar = props.avatar;

      this.shapes = {
         numbers: {},
         type: "player"
      }

      this.script = {
         dead: false,
         loop: null
      }
      this._init();
   }
   async _createNumberBlocks(damage) {
      return new Promise(resolve => {
         let numbers = String(damage).split("");
         let balloonsReadyCount = numbers.length;
         let ballonsList = [];

         if (damage > 0) {
            for (let num in numbers) {
               let img = new Image()

               img.onload = function () {
                  let numberBalloon = new Konva.Image({
                     x: (this.avatar.config.grid.width / 2) + (num * 40),
                     y: 50,
                     image: img,
                     width: 33,
                     height: 39,
                  });

                  ballonsList.push(numberBalloon);

                  if (balloonsReadyCount == ballonsList.length) {
                     this.shapes.numbers = ballonsList;
                     resolve();
                  }
               }.bind(this)
               img.src = numberPack[this.shapes.type][numbers[num]];
            }
         } else {
            let img = new Image()
            img.onload = function () {
               let numberBalloon = new Konva.Image({
                  x: (this.avatar.config.grid.width / 2),
                  y: 50,
                  image: img,
                  width: 120,
                  height: 47,
               });

               ballonsList.push(numberBalloon);

               if (balloonsReadyCount == ballonsList.length) {
                  this.shapes.numbers = ballonsList;
                  resolve();
               }
            }.bind(this)
            img.src = numberPack[this.shapes.type].miss;
         }
      })
   }
   _cleanBallons() {
      this.shapes.numbers = [];
   }
   _init() {
      this.animate(0);
      this._cleanBallons();
   }
   async animate(damage, type) {
      this.shapes.type = type || "monster";

      await this._createNumberBlocks(damage);

      let avatarGridHeight = Math.floor(this.config.grid.height);
      let avatarPos = this.avatar.location();

      const BALLON = new Konva.Group({
         x: Math.floor(avatarPos.x),
         y: Math.floor(avatarPos.y - ((avatarGridHeight / 2) - 100))
      })

      this.shapes.numbers.map((number) => BALLON.add(number));
      this.core.layer.add(BALLON);

      let anim = new Konva.Animation(function (frame) {
         let timeMax = 350;

         BALLON.move({ x: 1.1, y: -1.3 })
         BALLON.opacity(Math.abs(frame.time / timeMax - 1));

         if (frame.time >= timeMax) {
            BALLON.opacity(0);
            BALLON.remove();
            anim.stop();
         }
      }.bind(this))

      anim.start();
   }
}
