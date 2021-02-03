import numberPack from "@/views/HuntingGround.vue/shared/utils/numberPack.js";
import Konva from "konva";

export default class {
   constructor(props) {
      this.core = props.core;

      this.config = props.config;
      this.avatar = props.avatar;

      this.shapes = {
         numbers: [],
         numberBallon: null
      }

      this.script = {
         dead: false,
         loop: null
      }
   }
   _createNumberBlocks(damage) {
      let numbers = String(damage).split("");

      for (let num in numbers) {
         let img = new Image()

         img.onload = function () {
            let numberBalloon = new Konva.Image({
               x: 50 + (num * 25),
               y: 50,
               image: img,
               width: 26,
               height: 35,
            });

            this.shapes.numbers.push(numberBalloon);
         }.bind(this)

         img.src = numberPack[numbers[num]];
      }
   }
   _clean(node) {
      node.visible(false);
      node.remove()
      node.cleanCache();
   }
   async animate(damage) {
      await this._createNumberBlocks(damage);

      let avatarGridHeight = Math.floor(this.config.h);
      let avatarPos = { x: this.avatar.x(), y: this.avatar.y() };

      const BALLON = new Konva.Group({
         x: Math.floor(avatarPos.x - 20),
         y: Math.floor(avatarPos.y - ((avatarGridHeight / 2) - 50))
      })

      this.shapes.numbers.map((number) => BALLON.add(number))
      this.core.layer.add(BALLON)

      let ballonInitialY = BALLON.y();

      let anim = new Konva.Animation(function (frame) {
         let timeMax = 350;

         BALLON.move({ x: 1.1, y: -1.3 })
         BALLON.opacity(Math.abs(frame.time / timeMax - 1));

         if (frame.time >= timeMax) {
            BALLON.opacity(0);
            BALLON.remove();
            anim.stop();
         }
         if (this.shapes.numbers.length > 10) {
            this.shapes.numbers = [];
         }

      }.bind(this))

      anim.start();
   }
}
