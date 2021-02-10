import Konva from "konva";

export default class {
   constructor(props) {
      this.spriteConfig = props.misc;
      this.monsterSize = this.spriteConfig.size;

      this.config = {
         grid: this.spriteConfig.grid,
         container: this.spriteConfig.container
      }

      this.body = null;

      this.layer = null;
   }
   _createSprite(image, map) {
      return new Konva.Sprite({
         x: Math.random() * ((this.config.container.offsetWidth - 100) - 0) + 0,
         y: Math.random() * ((this.config.container.offsetHeight - 300) - 0) + 0,
         width: this.config.grid.width,
         height: this.config.grid.height + 300,
         image: image,
         animation: "standing",
         animations: {
            standing: map.standing,
            attacking: map.attacking,
            walkingLeft: map.walkingLeft,
            walkingUp: map.walkingUp,
            walkingRight: map.walkingRight,
            walkingDown: map.walkingDown,
            die: map.die,
         },
         frameRate: 12,
         frameIndex: 0
      });
   }
   _body() {
      let bodySprite = new Image();

      return new Promise(resolve => {
         bodySprite.onload = function () {
            this.body = this._createSprite(bodySprite, this.spriteConfig.map)
            resolve(this);
         }.bind(this);
         bodySprite.src = this.spriteConfig.spritesheet
      })
   }
   async load(layer) {
      this.layer = layer;

      await this._body();
      return this
   }
   animation(name) {
      if (this.body.animation() == name) return;
      this.body.animation(name);

      return this.body.animation();
   }
   location() {
      return { x: this.body.x(), y: this.body.y() }
   }
   move(x, y) {
      x = x ?? this.body.x();
      y = y ?? this.body.y();

      this.body.x(x);
      this.body.y(y);
   }
   stop() {
      this.body.stop();
   }
   visible(state) {
      state = state ?? true;
      this.body.visible(state);
   }
   frameSpeed(speed) {
      this.body.frameRate(speed);
   }
   getSound() {
      return this.config.sound
   }
   start() {
      this.body.start();
   }
   remove() {
      this.body.remove();
   }
}
