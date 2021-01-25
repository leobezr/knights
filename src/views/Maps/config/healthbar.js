export default class {
   constructor(canvas, x, y, { hp, maxHp }) {
      this.canvas = canvas;
      this.x = x;
      this.y = y;

      this.health = hp;
      this.maxHealth = maxHp;

      this.width = 110;
      this.height = 8;
   }
   render(x, y) {
      var percent = this.health / this.maxHealth;

      let context = this.canvas.getContext("2d");

      this.x = x;
      this.y = y;

      context.fillStyle = "black";
      context.fillRect(this.x, this.y, this.width, this.height);

      context.fillStyle = "red";
      context.fillRect(this.x, this.y, this.width * percent, this.height);
   }
   reduce(hp) {
      this.health = hp;
   }
}
