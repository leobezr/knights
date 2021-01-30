import Sprite from "@/views/Maps/config/sprite.js";
import SpritePack from "@/views/Maps/monsters/map-config.js";

const INTERVAL_SPEED = 55;

export default class {
   constructor(props) {
      this.canvas = props.$canvas;
      this.ctx = this.canvas.getContext("2d");
      this.characterLoop = null;
      this.monsterLoop = null;
      this.globalLoop = null;

      this.winCallback = () => { this._breakGameLoop(); props.win.call() }
      this.loseCallback = () => { this._breakGameLoop(); props.lose.call() }

      const HERO = SpritePack.players.hero

      this.character = new Sprite(HERO, 0, 0, this.canvas, false, {
         AI: false,
         win: this.winCallback,
         lose: this.loseCallback,
         damage: props.playerStats.damage,
         hp: props.playerStats.hp,
         def: props.playerStats.def,
         agi: props.playerStats.agi
      });

      this.monster = new Sprite(props.monster, 500, 500, this.canvas, false, {
         AI: true,
         win: this.winCallback,
         lose: this.loseCallback,
      });

      this.character.fight({ target: this.monster });
      this.monster.fight({ target: this.character });

      this.runGame();
   }
   _getCollision(player1, player2) {
      return player1.x < player2.x + player2.w &&
         player1.x + player1.w > player2.x &&
         player1.y < player2.y + (player2.h / 2) &&
         player1.y + player1.h / 5 > player2.y
   }
   _colliding() {
      const HERO = this.character.player;
      const MONSTER = this.monster.player;

      let isColliding = this._getCollision(HERO, MONSTER);

      this.monster.colliding(isColliding);
      this.character.colliding(isColliding);
   }
   _breakGameLoop() {
      setTimeout(() => clearInterval(this.characterLoop), 1000);
      setTimeout(() => clearInterval(this.monsterLoop), 1000);
      setTimeout(() => clearInterval(this.globalLoop), 1000);
   }

   updateFrames() {
      this.character.animate();
      this.monster.animate();
      this._colliding();

      this.monster.chase({ x: this.character.player.x, y: this.character.player.y, target: this.character })
   }
   drawCharacter() {
      this.character.draw();
   }
   drawMonster() {
      this.monster.draw();
   }
   attack() {
      this.monster.attack();
      this.character.attack(this.monster);
   }
   move(keyCode) {
      this.monster.move(keyCode);
      this.character.move(keyCode);
   }
   stop() {
      this.character.stop();
      this.monster.stop();
   }
   /**
    * New methods
    */
   runGame() {
      this.globalLoop = setInterval(() => this.updateFrames(), INTERVAL_SPEED);
      this.characterLoop = setInterval(() => this.drawCharacter(), INTERVAL_SPEED);
      this.monsterLoop = setInterval(() => this.drawMonster(), INTERVAL_SPEED);
   }
}
