import Konva from "konva";

export default class {
   constructor(props) {
      this.hp = props.stats.hp;
      this.maxHp = props.stats.maxHp
      this.AI = props.AI;

      this.core = props.core;
      this.config = props.config;
      this.avatar = props.avatar;

      this.shapes = {
         baseHealth: null,
         currentHealth: null,
         hpBarGroup: null,
         healthTicWidth: 98
      }

      this.script = {
         dead: false,
         loop: null
      }

      this.init();
   }
   _createBaseRect() {
      this.shapes.baseHealth = new Konva.Rect({
         x: 100,
         y: 100,
         width: 100,
         height: 8,
         fill: "#424242",
         stroke: "#10189c",
         strokeWidth: 2,
      })
   }
   _createHealthTic() {
      this.shapes.currentHealth = new Konva.Rect({
         x: 101,
         y: 101,
         width: 98,
         height: 6,
         fill: "#10ef21",
      })
   }
   _hpBarFollowAvatar() {
      let avatarGridHeight = Math.floor(this.config.h);
      let avatarPos = this.avatar.location();

      this.hpBarGroup = new Konva.Group({
         x: Math.floor(avatarPos.x),
         y: Math.floor(avatarPos.y + avatarGridHeight)
      })

      this.hpBarGroup.add(this.shapes.baseHealth);
      this.hpBarGroup.add(this.shapes.currentHealth);
      this.core.layer.add(this.hpBarGroup)
   }
   _stickyGroup() {
      let avatarPos = this.avatar.location();

      this.hpBarGroup.x(Math.floor(avatarPos.x));
      this.hpBarGroup.y(Math.floor((avatarPos.y + 165)));
   }
   _keepLoop() {
      if (this.script.dead) return;

      if (this.hp <= 0) this.hpBarGroup.visible(false);

      let percent = this.hp / this.maxHp;
      let healthBarWidth = this.shapes.healthTicWidth * percent;
      let fullHealthColor = this.AI ? "#a133b9" : "#10ef21"

      let barColor = percent < .3 ? "#ad1c1c" : fullHealthColor;
      this.shapes.currentHealth.fill(barColor);

      this.shapes.currentHealth.width(healthBarWidth);
      this._stickyGroup();

      this.script.loop = window.requestAnimationFrame(() => {
         setTimeout(() => this._keepLoop(), 65);
      })
   }

   destroy() {
      this.script.dead = true;
      window.cancelAnimationFrame(this.script.loop);
   }
   init() {
      this._createBaseRect();
      this._createHealthTic();
      this._hpBarFollowAvatar()

      this._keepLoop();
   }
   updateHpStatus(hp) {
      this.hp = hp;
   }
}
