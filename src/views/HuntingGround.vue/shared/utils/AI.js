export default class {
   constructor(props) {
      this.id = props.id

      this._onLeft = () => { };
      this._onUp = () => { };
      this._onRight = () => { };
      this._onDown = () => { };

      this._onRelease = () => { };
      this._onClickRelease = () => { };
      this._onSpaceRelease = () => { };

      this._onClick = () => { }

      this.walking = false;
      this._repeater = null;
      this.lastDir = null;

      this.actions = {
         updateMapPlayers: props.updateMapPlayers
      }

      this.mapScanner = null;
      this.self = null;
      this.enemy = null;

      this.speed = props.speed;
      this.range = props.attackRange
      this.ticsInIdle = 0;
      this.loop = null;

      this.script = {
         dead: false
      }

      this.startLoop();
   }
   _dmgCalculator(enemy, self) {
      const balanceDamage = 4000;

      let selfDamage = self.config.stats.damage;
      let enemyArmor = enemy.stats.def

      return Math.round(selfDamage * (balanceDamage + enemyArmor) / (balanceDamage + enemyArmor * 10));
   }
   _trackAndDestroy(self, enemy) {
      const posSelf = { x: self.x(), y: self.y() };
      const posEnemy = { x: enemy.x(), y: enemy.y() };

      const hypotInX = Math.hypot(posSelf.x, Math.round(posEnemy.x - posSelf.x))
      const hypotInY = Math.hypot(posSelf.y, Math.round(posEnemy.y - posSelf.y))

      const attackRange = this.range;

      const boxOffset = { x: posSelf.x + attackRange, y: posSelf.y + attackRange };

      if (this.ticsInIdle >= Math.round(80 - (this.speed / 15))) {
         self.x(enemy.x() - attackRange);
         self.y(enemy.y() - attackRange);
      }

      if (hypotInX >= 0 && hypotInX < boxOffset.x) {
         if (hypotInY >= 0 && hypotInY < boxOffset.y) {
            this._onClick.call();
            return;
         }
      }
      this._onClickRelease();

      if (posSelf.x > posEnemy.x && hypotInX > boxOffset.x) {
         this._onLeft.call()
      } else if (posSelf.y > posEnemy.y && hypotInY > boxOffset.y) {
         this._onUp.call();
      }
      else if (posSelf.x < posEnemy.x && hypotInX > boxOffset.x) {
         this._onRight.call();
      } else {
         this._onDown.call();
      }
   }
   /**
    * Release cache before destroying
    */
   _clearCache() {
      this.walking = false;
      this.lastDir = null;

      clearInterval(this._repeater);
   }
   /**
    * Define direction
    * @param {Function} cb
    */
   _setDir(cb) {
      this.walking = true;
      this.lastDir = cb;
   }
   /**
    * Binded methods
    */
   setEvent = function (e) {
      const CODE = e.keyCode;

      if (CODE == 38 || CODE == 87) {
         this._onUp.call();
      } else if (CODE == 39 || CODE == 68) {
         this._onRight.call();
      } else if (CODE == 40 || CODE == 83) {
         this._onDown.call();
      } else if (CODE == 37 || CODE == 65) {
         this._onLeft.call();
      }
   }.bind(this)

   setRelease = function () {
      this._onRelease.call();
   }.bind(this)

   setClick = function () {
      this._onClick.call();
   }.bind(this)

   removeClick = function () {
      this._onClickRelease.call();
   }.bind(this)

   /**
    * Open method, expects callback function
    * @param {Function} cb
    */
   onLeft(cb) {
      this._onLeft = () => {
         this._clearCache();
         this._setDir(cb);

         cb.call()
      };
   }
   /**
    * Open method, expects callback function
    * @param {Function} cb
    */
   onUp(cb) {
      this._onUp = () => {
         this._clearCache();
         this._setDir(cb);

         cb.call()
      };
   }
   /**
    * Open method, expects callback function
    * @param {Function} cb
    */
   onRight(cb) {
      this._onRight = () => {
         this._clearCache();
         this._setDir(cb);

         cb.call()
      };
   }
   /**
    * Open method, expects callback function
    * @param {Function} cb
    */
   onDown(cb) {
      this._onDown = () => {
         this._clearCache();
         this._setDir(cb);

         cb.call()
      };
   }
   /**
    * Open method, expects callback function
    * @param {Function} cb
    */
   onRelease(cb) {
      this._onRelease = () => {
         this._clearCache();
         this._onSpaceRelease();

         cb.call()
      };
   }
   /**
    * Open method, expects callback function
    * @param {Function} cb
    */
   onClickRelease(cb) {
      this._onClickRelease = () => {
         this._clearCache();

         cb.call();
      }
   }
   /**
    * Open method, expects callback function
    * @param {Function} cb
    */
   onSpaceRelease(cb) {
      this._onClickRelease = () => {
         this._clearCache();

         cb.call();
      }
   }
   /**
    * Open method, expects callback function
    * @param {Function} cb
    */
   onSpace(cb) {
      this._onSpace = () => {
         this._clearCache();

         cb.call();
      }
   }
   /**
    * Open method, expects callback function
    * @param {Function} cb
    */
   onClick(cb) {
      this._onClick = () => {
         this._clearCache();
         this.ticsInIdle = 0;

         cb.call();
      }
   }
   /**
    * Deal damage to enemy
    */
   dealDamage() {
      const ENEMY = this.enemy;
      ENEMY.takeDamage(this._dmgCalculator(ENEMY, this.self))
   }
   destroyEvents() {
      window.cancelAnimationFrame(this.loop);
      this.script.dead = true;
   }
   startLoop() {
      const LOOP = () => this.startLoop();
      this.ticsInIdle++;

      this.loop = window.requestAnimationFrame(function () {
         if (this.script.dead) return;

         let scan = this.actions.updateMapPlayers.call();

         this.mapScanner = scan.monsters.filter(m => m.config.id != this.id);
         this.self = scan.monsters.filter(m => m.config.id == this.id)[0];
         this.enemy = scan.player?.config;

         if (this.self && this.enemy) {
            this._trackAndDestroy(this.self.config.monster, this.enemy.player, this.enemy);
         }

         if (this.walking) {
            this.lastDir.call()
         }
         setTimeout(() => { window.requestAnimationFrame(LOOP) }, 65);
      }.bind(this))
   }
}
