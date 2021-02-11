import Konva from "konva";

export default class {
   constructor(props) {

      this.layer = props.layer
      this.player = props.player
      this.attackRange = props.attackRange + 300

      this.circle = null;

      this._rangedCircle()
   }
   _rangedCircle() {
      const RADIUS = this.attackRange;
      let avatarPosition = this.player.location();
      let player = this.player.body;

      this.circle = new Konva.Circle({
         radius: RADIUS,
         x: avatarPosition.x + (player.width() / 2),
         y: avatarPosition.y + ((player.height() / 2) + 40),
         stroke: "rgba(255, 255, 255, .30)",
         strokeWidth: 3
      })

      this.layer.add(this.circle);
   }
   _rangedCircleUpdate() {
      let avatarPosition = this.player.location();
      let player = this.player.body;

      if (this.circle) {
         this.circle.x(avatarPosition.x + (player.width() / 2));
         this.circle.y(avatarPosition.y + ((player.height() / 2) + 40));
      }
   }
   updatePosition() {
      this._rangedCircleUpdate();
   }
}
