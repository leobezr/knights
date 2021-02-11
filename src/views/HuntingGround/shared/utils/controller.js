export default class {
   constructor(props) {
      this._onLeft = () => { };
      this._onUp = () => { };
      this._onRight = () => { };
      this._onDown = () => { };

      this._onRelease = () => { };
      this._onClickRelease = () => { };
      this._onSpaceRelease = () => { };

      this._onSpace = () => { }
      this._onClick = () => { }

      window.addEventListener("keydown", this.setEvent);
      window.addEventListener("keyup", this.setRelease);

      window.addEventListener("mousedown", this.setClick);
      window.addEventListener("mouseup", this.removeClick);

      this.walking = false;
      this._repeater = null;
      this.lastDir = null;

      this.script = {
         dead: false,
         loop: null
      }

      this.actions = {
         updateMapPlayers: props.updateMapPlayers,
         updateCollision: props.updateCollision
      }

      this.attr = {
         attackRange: props.attackRange,
         collisionPoint: props.collisionBox
      }

      this.startLoop();
   }
   _attackCollisionPoint(enemy) {
      let collider = this.attr.collisionPoint;
      let boxCollider = collider.box;

      if (enemy) {
         let enemyX = enemy.pos.x;
         let enemyY = enemy.pos.y;

         let enemyWidth = enemy.pos.w;
         let enemyHeight = enemy.pos.h;

         let boxColliderX = boxCollider.x()
         let boxColliderY = boxCollider.y()

         let boxColliderWidth = boxCollider.width();
         let boxColliderHeight = boxCollider.height();

         return boxColliderX < enemyX + enemyWidth &&
            boxColliderX + boxColliderWidth > enemyX &&
            boxColliderY < enemyY + (enemyHeight / 2) &&
            boxColliderY + boxColliderHeight / 2 > enemyY
      }
      return false;
   }
   /**
    * Locate enemies
    * @param {Object} self -> Self data
    * @param {Object} enemy -> Enemy Data
    */
   _attackIfInRange(enemy) {

      let spawnMap = enemy.map(creature => {
         return {
            pos: {
               x: creature.config.monster.body.x(),
               y: creature.config.monster.body.y(),
               w: creature.sprite.body.width(),
               h: creature.sprite.body.height()
            },
            id: creature.config.id
         }
      });

      const collisionList = []

      for (let spawn of spawnMap) {
         if (this._attackCollisionPoint(spawn)) {
            collisionList.push(spawn.id);
         }

         this.actions.updateCollision(collisionList);
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

      this.repeater();
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

         cb.call();
      }
   }

   repeater() {
      this._repeater = setInterval(() => {
         if (this.walking) {
            this.lastDir.call()
         }
      }, 100)
   }
   destroyEvents() {
      window.removeEventListener("keydown", this.setEvent, false);
      window.removeEventListener("keyup", this.setRelease, false);

      window.removeEventListener("mousedown", this.setClick, false);
      window.removeEventListener("mouseup", this.removeClick, false);

      this.script.dead = true;
      window.cancelAnimationFrame(this.script.loop);
   }
   startLoop() {
      const LOOP = () => this.startLoop();
      this.ticsInIdle++;

      this.script.loop = window.requestAnimationFrame(function () {
         if (this.script.dead) return;

         let scan = this.actions.updateMapPlayers.call();

         this.self = scan.player.config;
         this.enemies = scan.monsters.filter(m => m.config.id != this.id);

         if (this.self && this.enemies) {
            this._attackIfInRange(this.enemies);
         }

         if (this.walking) {
            this.lastDir.call()
         }
         setTimeout(() => { window.requestAnimationFrame(LOOP) }, 65);
      }.bind(this))
   }
}
