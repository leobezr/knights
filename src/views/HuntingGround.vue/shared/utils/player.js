import Konva from "konva";
import Controller from "@/views/HuntingGround.vue/shared/utils/controller.js";
import HealthBar from "@/views/HuntingGround.vue/shared/utils/healthbar.js";
import DamageCounter from "@/views/HuntingGround.vue/shared/utils/damageCounter.js";
import { Howl } from "howler";

export default class {
   constructor(props) {
      this.player = null;

      this.config = {
         sprite: props.spritesheet,
         h: props.spriteProp.height / props.spriteProp.rows,
         w: props.spriteProp.width / props.spriteProp.cols,
         attackRange: props.spriteProp.misc.attackRange || 20,
         container: props.container,
         layer: props.layer,
         stage: props.stage
      }

      this.sprite = {
         map: props.spriteProp.map
      }

      const stats = props.spriteProp.stats;

      this.stats = {
         dead: false,
         hp: stats.attributes.hp,
         maxHp: stats.attributes.hp,
         damage: stats.attributes.hit,
         def: stats.attributes.def,
         agi: Math.floor(stats.attributes.agi + stats.modifier.agi),
         speed: Math.floor((stats.attributes.agi + stats.modifier.agi) * .065),
         sound: {
            attack: props.spriteProp.sound.attack,
            onHit: props.spriteProp.sound.onHit
         }
      }

      this.actions = {
         updateMapPlayers: props.onScreenUpdate,
         commands: props.commands
      }

      this.collision = []
      this.fightLog = {
         enemiesKilled: 0,
         enemyIdKilled: {}
      }

      this.healthBar = null;
      this.damageCounter = null;
      this.killCounter = 0;
   }
   _dmgCalculator(enemy) {
      const balanceDamage = 4000;

      let selfDamage = this.stats.damage;
      let enemyArmor = enemy.config.stats.def
      let damage = Math.round(selfDamage * (balanceDamage + enemyArmor) / (balanceDamage + enemyArmor * 10));

      return damage;
   }
   _attackAllCreatures(list) {
      if (this.stats.dead) return;

      for (let monster of list) {
         this.player.animation("attacking");
         let targetAttacked = monster.config.takeDamage(this._dmgCalculator(monster));

         var onHit = new Howl({
            src: [this.stats.sound.onHit],
            volume: 0.1,
         });
         onHit.play();
         setTimeout(() => onHit.unload(), 800);

         if (!this.fightLog.enemyIdKilled[monster.config.config.id]) {
            this.fightLog.enemyIdKilled[monster.config.config.id] = 0;
         }

         if (targetAttacked) {
            this.fightLog.enemiesKilled += targetAttacked;
            this.fightLog.enemyIdKilled[monster.config.config.id] += targetAttacked;
         }
      }

      let arenaParticipant = this.actions.updateMapPlayers()

      if (this.fightLog.enemiesKilled == arenaParticipant.monsters.length) {
         this.actions.commands.win(this.fightLog.enemyIdKilled)
      }
   }
   /**
    * Generate Healthbar
    */
   _setHealthBar() {
      const CORE = { layer: this.config.layer, stage: this.config.stage };

      this.healthBar = new HealthBar({
         stats: this.stats,
         avatar: this.player,
         core: CORE, config:
            this.config
      });
   }
   _setDamageCounter() {
      const CORE = { layer: this.config.layer, stage: this.config.stage };

      this.damageCounter = new DamageCounter({
         stats: this.stats,
         avatar: this.player,
         core: CORE,
         config: this.config,
      });
   }
   _suicide() {
      this.stats.dead = true;
      this.player.animation("die");

      setTimeout(() => {
         this.player.stop();
         this.player.visible(false);

         this.actions.commands.lose();
      }, 600);
   }
   /**
    * When a monster hits the character, it should take damage
    * @param {Number} damage
    */
   takeDamage(damage) {
      damage = damage > 0 ? damage : 1;

      if (this.stats.dead) return;
      let currentHp = Math.floor(this.stats.hp - damage);

      this.damageCounter.animate(damage);

      if (currentHp <= 0) {
         this.stats.hp = 0;
      } else {
         this.stats.hp = currentHp;
      }
      this.healthBar.updateHpStatus(this.stats.hp);

      if (this.stats.hp <= 0) {
         if (!this.stats.dead) {
            this._suicide();
         }
      }
   }
   /**
    * Generate attack sound
    * onHit is reserved when hitting an enemy, should not be used when missing
    */
   _attackSound() {
      var attack = new Howl({
         src: [this.stats.sound.attack],
         volume: 0.1,
      });

      attack.play();
      setTimeout(() => attack.unload(), 800);
   }
   /**
    * Call Controller
    */
   _setControles() {
      this.controller = new Controller({
         updateMapPlayers: this.actions.updateMapPlayers,
         attackRange: this.config.attackRange,
         updateCollision: this._updateCollision.bind(this)
      });

      this._movementController();
      this._attackController();
   }
   _updateCollision(collisionList) {
      this.collision = collisionList
   }
   /**
    * Attack handler
    */
   _attackController() {
      let loop = null;

      const attackFn = () => {
         if (this.stats.dead) return;

         const SPEED = this.stats.speed <= 10 ? 10 : this.stats.speed >= 150 ? 150 : this.stats.speed;
         const ATTACK_SPEED = Math.round(7 * (1000 / SPEED));

         this.player.animation("attacking");
         this.player.frameRate(SPEED + (SPEED * .1));

         clearInterval(loop);
         loop = setInterval(function () {
            this._attackSound();

            const ARENA = this.actions.updateMapPlayers();
            let monsterInRange = [];

            monsterInRange = ARENA.monsters.filter(monster => this.collision.includes(monster.config.id));

            this._attackAllCreatures(monsterInRange);
         }.bind(this), ATTACK_SPEED);
      }
      const attackReleaseFn = () => {
         this.player.animation("standing");
         this.player.frameRate(12);

         clearInterval(loop);
      }

      this.controller.onClick(attackFn);
      this.controller.onClickRelease(attackReleaseFn);
   }
   /**
    * Movement controller, hotkeys and such
    */
   _movementController() {
      let containerMaxWidth = this.config.container.offsetWidth;
      let containerMaxHeight = this.config.container.offsetHeight;

      const SPEED = this.stats.speed <= 10 ? 10 : this.stats.speed >= 150 ? 150 : this.stats.speed;

      this.controller.onUp(() => {
         if (this.stats.dead) return;
         let playerPosY = this.player.y();

         this.player.frameRate(12);
         this.player.animation("walkingUp");

         if (playerPosY >= 0) {
            this.player.y(playerPosY - SPEED);
         } else {
            this.player.y(0);
         }
      })
      this.controller.onDown(() => {
         if (this.stats.dead) return;
         let playerPosY = this.player.y();

         this.player.frameRate(12);
         this.player.animation("walkingDown");

         if (playerPosY <= (containerMaxHeight - 120)) {
            this.player.y(playerPosY + SPEED);
         } else {
            this.player.y(containerMaxHeight - 120);
         }
      })
      this.controller.onRight(() => {
         if (this.stats.dead) return;
         let playerPosX = this.player.x();

         this.player.frameRate(12);
         this.player.animation("walkingRight");

         if (playerPosX < (containerMaxWidth - 120)) {
            this.player.x(playerPosX + SPEED);
         } else {
            this.player.x(containerMaxWidth - 120);
         }
      })
      this.controller.onLeft(() => {
         if (this.stats.dead) return;
         let playerPosX = this.player.x();

         this.player.frameRate(12);
         this.player.animation("walkingLeft");

         if (playerPosX >= 0) {
            this.player.x(playerPosX - SPEED);
         } else {
            this.player.x(0);
         }
      })
      this.controller.onRelease(() => {
         this.player.frameRate(12);
         this.player.animation("standing");
      })
   }
   /**
    * Trigger player method
    * @returns {Promise}
    */
   init() {
      return new Promise(resolve => {
         const imageObj = new Image();

         imageObj.onload = function () {
            const SPRITE = this.sprite.map;

            this.player = new Konva.Sprite({
               x: 50,
               y: 50,
               image: imageObj,
               animation: "standing",
               animations: {
                  standing: SPRITE.standing,
                  attacking: SPRITE.attacking,
                  walkingLeft: SPRITE.walkingLeft,
                  walkingUp: SPRITE.walkingUp,
                  walkingRight: SPRITE.walkingRight,
                  walkingDown: SPRITE.walkingDown,
                  die: SPRITE.die,
               },
               frameRate: 12,
               frameIndex: 0
            });

            this._setHealthBar();
            this._setDamageCounter();
            this._setControles();
            resolve({ sprite: this.player, config: this });
         }.bind(this);

         imageObj.src = this.config.sprite;
      })
   }
   /**
    * Vue beforeDestroy lifecycle calls this method and cleans
    * Child intervals and loops
    */
   destroyEvents() {
      this.controller.destroyEvents();
      this.healthBar.destroy()
   }
   resetReward() {
      this.fightLog.enemiesKilled = 0;
      this.fightLog.enemyIdKilled = {};
   }
}
