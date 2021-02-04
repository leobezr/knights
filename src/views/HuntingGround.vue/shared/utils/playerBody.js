import Konva from "konva";
import bodySprite from "@/views/HuntingGround.vue/shared/config/heroes.js";
import headSprite from "@/views/HuntingGround.vue/shared/config/head-sprites.js";
import headgearSprite from "@/views/HuntingGround.vue/shared/config/headgear-sprites.js";
import Store from "@/store"

const equipGetter = equips => {
   let top = equips["headgear-top"];
   let middle = equips["headgear-middle"];
   let lower = equips["headgear-lower"];

   if (top) {
      top = headgearSprite[top.id];
   } else {
      top = null;
   }
   if (middle) {
      middle = headgearSprite[middle.id];
   } else {
      middle = null;
   }
   if (lower) {
      lower = headgearSprite[lower.id];
   } else {
      lower = null;
   }

   return { top, middle, lower };
}

export default class {
   constructor(props) {
      this.config = bodySprite.gender[props.gender].classes[props.vocation];
      this.persona = Store.getters.persona;

      this.body = null;
      this._bodyConfig = {
         spritesheet: this.config.spritesheet.color[props.color],
         map: this.config.map,
      };

      this.head = null;
      this._headConfig = {
         spritesheet: headSprite.gender[props.gender][props.head.type][props.head.color].spritesheet,
         map: headSprite.gender[props.gender].map
      }

      this.headgear = {};
      this._headgearConfig = {
         equipped: this.persona.equipped,
         spritesheet: headgearSprite,
      }

      this.layer = null;
   }
   _createSprite(image, map) {
      return new Konva.Sprite({
         x: 50,
         y: 50,
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
            this.body = this._createSprite(bodySprite, this._bodyConfig.map)
            resolve(this);
         }.bind(this);
         bodySprite.src = this._bodyConfig.spritesheet
      })
   }
   _head() {
      let headSprite = new Image();

      return new Promise(resolve => {
         headSprite.onload = function () {
            this.head = this._createSprite(headSprite, this._bodyConfig.map)
            resolve(this);
         }.bind(this);
         headSprite.src = this._headConfig.spritesheet
      })
   }
   _headgear() {
      const HEADGEARS = equipGetter(this._headgearConfig.equipped);
      if (!HEADGEARS.top && !HEADGEARS.middle && !HEADGEARS.lower) return;

      let headgearMiddlePromise = new Promise(resolve => {
         const headgearMiddle = new Image();

         headgearMiddle.onload = function () {
            this.headgear.middle = this._createSprite(headgearMiddle, this._bodyConfig.map);

            resolve(this);
         }.bind(this);
         if (!HEADGEARS.middle) resolve(this);
         headgearMiddle.src = HEADGEARS.middle.spritesheet
      })
      let headgearTopPromise = new Promise(resolve => {
         const headgearTop = new Image();

         headgearTop.onload = function () {
            this.headgear.top = this._createSprite(headgearTop, this._bodyConfig.map);

            resolve(this);
         }.bind(this);
         if (!HEADGEARS.top) resolve(this);
         headgearTop.src = HEADGEARS.top.spritesheet
      })

      return Promise.all([headgearTopPromise, headgearMiddlePromise]);
   }
   async load(layer) {
      this.layer = layer;

      await this._body();
      await this._head();
      await this._headgear();

      return this
   }
   animation(name) {
      this.body.animation(name);
      this.head.animation(name);

      if (this.headgear.top) {
         this.headgear.top.animation(name);
      }
      if (this.headgear.middle) {
         this.headgear.middle.animation(name);
      }

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

      this.head.x(x);
      this.head.y(y);

      if (this.headgear.top) {
         this.headgear.top.x(x);
         this.headgear.top.y(y);
      }
      if (this.headgear.middle) {
         this.headgear.middle.x(x);
         this.headgear.middle.y(y);
      }
   }
   stop() {
      this.body.stop();
      this.head.stop();

      if (this.headgear.top) {
         this.headgear.top.stop();
      }
      if (this.headgear.middle) {
         this.headgear.middle.stop();
      }
   }
   visible(state) {
      state = state ?? true;
      this.body.visible(state);
      this.head.visible(state);

      if (this.headgear.top) {
         this.headgear.top.visible(state);
      }
      if (this.headgear.middle) {
         this.headgear.middle.visible(state);
      }
   }
   frameSpeed(speed) {
      this.body.frameRate(speed);
      this.head.frameRate(speed);

      if (this.headgear.top) {
         this.headgear.top.frameRate(speed);
      }
      if (this.headgear.middle) {
         this.headgear.middle.frameRate(speed);
      }
   }
   getSound() {
      return this.config.sound
   }
   start() {
      this.body.start();
      this.head.start();

      if (this.headgear.middle) {
         this.headgear.middle.start();
      }
      if (this.headgear.top) {
         this.headgear.top.start();
      }
   }
   remove() {
      this.body.remove();
      this.head.remove();

      if (this.headgear.top) {
         this.headgear.top.remove();
      }
      if (this.headgear.middle) {
         this.headgear.middle.remove();
      }
   }
   getChildren() {
      let children = {
         body: this.body,
         head: this.head,
      }

      if (this.headgear.top) {
         if (!children.headgear) children.headgear = {};
         children.headgear.top = this.headgear.top;
      }
      if (this.headgear.middle) {
         if (!children.headgear) children.headgear = {};
         children.headgear.middle = this.headgear.middle;
      }
      if (this.headgear.lower) {
         if (!children.headgear) children.headgear = {};
         children.headgear.lower = this.headgear.lower;
      }
      return children;
   }
}
