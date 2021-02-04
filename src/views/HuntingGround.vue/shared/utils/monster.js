import Konva from "konva";
import AI from "@/views/HuntingGround.vue/shared/utils/AI.js";
import HealthBar from "@/views/HuntingGround.vue/shared/utils/healthbar.js";
import DamageCounter from "@/views/HuntingGround.vue/shared/utils/damageCounter.js";
import { Howl } from "howler";

export default class {
   constructor(props) {
      this.id = props.id
      this.monster = null;

      this.config = {
         id: props.idType,
         sprite: props.spritesheet,
         attackRange: props.spriteProp.attackRange,
         container: props.container,
         layer: props.layer,
         stage: props.stage,
         grid: {
            height: props.spriteProp.height / props.spriteProp.rows,
            width: props.spriteProp.width / props.spriteProp.cols,
         },
      }
      this.stats = {
         hp: props.spriteProp.health,
         dead: false,
         maxHp: props.spriteProp.health,
         damage: props.spriteProp.damage,
         def: props.spriteProp.def,
         agi: props.spriteProp.agi,
         speed: Math.floor(props.spriteProp.agi * .065),
         sound: {
            attack: props.spriteProp.sound.attack,
            onHit: props.spriteProp.sound.onHit
         }
      }
      this.actions = {
         updateMapPlayers: props.onScreenUpdate
      }

      this.healthBar = null;
      this.damageCounter = null;

      this.AI = null;
   }
   /**
    * Generate sound when attacking
    * onHit sound is reserved for when hitting an enemy
    */
   _attackSound() {
      var attack = new Howl({
         src: [this.stats.sound.attack],
         volume: 0.1,
      });

      attack.play();
      setTimeout(() => attack.unload(), 800);

      if (this.stats.sound.onHit) {
         var onHit = new Howl({
            src: [this.stats.sound.onHit],
            volume: 0.1,
         });

         onHit.play();
         setTimeout(() => onHit.unload(), 800);
      }
   }
   _suicide() {
      this.stats.dead = true;
      this.monster.animation("die");

      setTimeout(() => {
         this.monster.stop();
         this.monster.visible(false);
         this.monster.remove();
      }, 600);
   }
   _setControles() {
      this.AI = new AI({
         updateMapPlayers: this.actions.updateMapPlayers,
         id: this.id,
         speed: this.stats.speed <= 10 ? 10 : this.stats.speed >= 150 ? 150 : this.stats.speed,
         attackRange: this.config.attackRange
      });

      this._movementController();
      this._attackController();
   }
   _attackController() {
      let canAttack = true;

      const attackFn = () => {
         const SPEED = this.stats.speed <= 10 ? 10 : this.stats.speed >= 200 ? 200 : this.stats.speed;
         const ATTACK_SPEED = Math.round(7 * (1000 / SPEED));

         if (this.stats.hp == 0) return;

         this.monster.animation("attacking");
         this.monster.frameRate(SPEED);

         let timer = ATTACK_SPEED;

         if (canAttack) {
            this._attackSound();
            this.AI.dealDamage();
            canAttack = false;

            setTimeout(() => canAttack = true, timer);
         }
      }
      const attackReleaseFn = () => {
         this.monster.animation("standing");
         this.monster.frameRate(12);
      }

      this.AI.onClick(attackFn);
      this.AI.onClickRelease(attackReleaseFn);
   }
   _setHealthBar() {
      const CORE = { layer: this.config.layer, stage: this.config.stage };

      this.healthBar = new HealthBar({
         stats: this.stats,
         avatar: this.monster,
         core: CORE,
         config: this.config,
         AI: true
      });
   }
   _setDamageCounter() {
      const CORE = { layer: this.config.layer, stage: this.config.stage };

      this.damageCounter = new DamageCounter({
         stats: this.stats,
         avatar: this.monster,
         core: CORE,
         config: this.config,
      });
   }
   _movementController() {
      let containerMaxWidth = this.config.container.offsetWidth;
      let containerMaxHeight = this.config.container.offsetHeight;

      const SPEED = this.stats.speed <= 10 ? 10 : this.stats.speed >= 75 ? 75 : this.stats.speed;

      this.AI.onUp(() => {
         if (this.stats.hp == 0) return;
         let playerPosY = this.monster.y();

         this.monster.frameRate(12);
         this.monster.animation("walkingUp");

         if (playerPosY >= 0) {
            this.monster.y(playerPosY - SPEED);
         } else {
            this.monster.y(0);
         }
      })
      this.AI.onDown(() => {
         if (this.stats.hp == 0) return;
         let playerPosY = this.monster.y();

         this.monster.frameRate(12);
         this.monster.animation("walkingDown");

         if (playerPosY <= (containerMaxHeight - 120)) {
            this.monster.y(playerPosY + SPEED);
         } else {
            this.monster.y(containerMaxHeight - 120);
         }
      })
      this.AI.onRight(() => {
         if (this.stats.hp == 0) return;
         let playerPosX = this.monster.x();

         this.monster.frameRate(12);
         this.monster.animation("walkingRight");

         if (playerPosX < (containerMaxWidth - 120)) {
            this.monster.x(playerPosX + SPEED);
         } else {
            this.monster.x(containerMaxWidth - 120);
         }
      })
      this.AI.onLeft(() => {
         if (this.stats.hp == 0) return;
         let playerPosX = this.monster.x();

         this.monster.frameRate(12);
         this.monster.animation("walkingLeft");

         if (playerPosX >= 0) {
            this.monster.x(playerPosX - SPEED);
         } else {
            this.monster.x(0);
         }
      })
      this.AI.onRelease(() => {
         this.monster.frameRate(12);
         this.monster.animation("standing");
      })
   }
   init() {
      return new Promise(resolve => {
         const imageObj = new Image();

         imageObj.onload = function () {
            const spriteH = parseInt(this.config.grid.height);
            const spriteW = parseInt(this.config.grid.width);

            const spriteOffset = spriteW;

            this.monster = new Konva.Sprite({
               x: Math.random() * (this.config.container.offsetWidth - 0) + 0,
               y: Math.random() * (this.config.container.offsetHeight - 0) + 0,
               image: imageObj,
               animation: "standing",
               animations: {
                  standing: [
                     0, spriteH, spriteW, spriteH,
                     spriteOffset, spriteH, spriteW, spriteH,
                     spriteOffset * 2, spriteH, spriteW, spriteH,
                     spriteOffset * 3, spriteH, spriteW, spriteH,
                     spriteOffset * 4, spriteH, spriteW, spriteH,
                     spriteOffset * 5, spriteH, spriteW, spriteH,
                     spriteOffset * 6, spriteH, spriteW, spriteH,
                     spriteOffset * 7, spriteH, spriteW, spriteH,
                  ],
                  attacking: [
                     0, 0, spriteW, spriteH,
                     spriteOffset, 0, spriteW, spriteH,
                     spriteOffset * 2, 0, spriteW, spriteH,
                     spriteOffset * 3, 0, spriteW, spriteH,
                     spriteOffset * 4, 0, spriteW, spriteH,
                     spriteOffset * 5, 0, spriteW, spriteH,
                     spriteOffset * 6, 0, spriteW, spriteH,
                     spriteOffset * 7, 0, spriteW, spriteH,
                  ],
                  walkingLeft: [
                     0, spriteH * 2, spriteW, spriteH,
                     spriteOffset, spriteH * 2, spriteW, spriteH,
                     spriteOffset * 2, spriteH * 2, spriteW, spriteH,
                     spriteOffset * 3, spriteH * 2, spriteW, spriteH,
                     spriteOffset * 4, spriteH * 2, spriteW, spriteH,
                     spriteOffset * 5, spriteH * 2, spriteW, spriteH,
                     spriteOffset * 6, spriteH * 2, spriteW, spriteH,
                     spriteOffset * 7, spriteH * 2, spriteW, spriteH,
                  ],
                  walkingUp: [
                     0, spriteH * 3, spriteW, spriteH,
                     spriteOffset, spriteH * 3, spriteW, spriteH,
                     spriteOffset * 2, spriteH * 3, spriteW, spriteH,
                     spriteOffset * 3, spriteH * 3, spriteW, spriteH,
                     spriteOffset * 4, spriteH * 3, spriteW, spriteH,
                     spriteOffset * 5, spriteH * 3, spriteW, spriteH,
                     spriteOffset * 6, spriteH * 3, spriteW, spriteH,
                     spriteOffset * 7, spriteH * 3, spriteW, spriteH,
                  ],
                  walkingRight: [
                     0, spriteH * 4, spriteW, spriteH,
                     spriteOffset, spriteH * 4, spriteW, spriteH,
                     spriteOffset * 2, spriteH * 4, spriteW, spriteH,
                     spriteOffset * 3, spriteH * 4, spriteW, spriteH,
                     spriteOffset * 4, spriteH * 4, spriteW, spriteH,
                     spriteOffset * 5, spriteH * 4, spriteW, spriteH,
                     spriteOffset * 6, spriteH * 4, spriteW, spriteH,
                     spriteOffset * 7, spriteH * 4, spriteW, spriteH,
                  ],
                  walkingDown: [
                     0, spriteH * 5, spriteW, spriteH,
                     spriteOffset, spriteH * 5, spriteW, spriteH,
                     spriteOffset * 2, spriteH * 5, spriteW, spriteH,
                     spriteOffset * 3, spriteH * 5, spriteW, spriteH,
                     spriteOffset * 4, spriteH * 5, spriteW, spriteH,
                     spriteOffset * 5, spriteH * 5, spriteW, spriteH,
                     spriteOffset * 6, spriteH * 5, spriteW, spriteH,
                     spriteOffset * 7, spriteH * 5, spriteW, spriteH,
                  ],
                  die: [
                     0, spriteH * 6, spriteW, spriteH,
                     spriteOffset, spriteH * 6, spriteW, spriteH,
                     spriteOffset * 2, spriteH * 6, spriteW, spriteH,
                     spriteOffset * 3, spriteH * 6, spriteW, spriteH,
                     spriteOffset * 4, spriteH * 6, spriteW, spriteH,
                     spriteOffset * 5, spriteH * 6, spriteW, spriteH,
                     spriteOffset * 6, spriteH * 6, spriteW, spriteH,
                     spriteOffset * 7, spriteH * 6, spriteW, spriteH,
                     spriteOffset * 7, spriteH * 6, spriteW, spriteH,
                  ],
               },
               frameRate: 12,
               frameIndex: 0
            });

            this.monster.location = () => {
               return {
                  x: this.monster.x(),
                  y: this.monster.y()
               }
            }

            this._setHealthBar();
            this._setDamageCounter();
            this._setControles();
            resolve({ sprite: this.monster, config: this });
         }.bind(this);

         imageObj.src = this.config.sprite;
      })
   }
   /**
    * When a monster hits the character, it should take damage
    * @param {Number} damage
    */
   takeDamage(damage) {
      damage = damage > 0 ? damage : 1;
      if (this.stats.dead) return;

      this.damageCounter.animate(damage);

      let currentHp = Math.floor(this.stats.hp - damage);

      if (currentHp <= 0) {
         this.stats.hp = 0;
      } else {
         this.stats.hp = currentHp;
      }

      this.healthBar.updateHpStatus(this.stats.hp);

      if (this.stats.hp <= 0) {
         if (!this.stats.dead) {
            this._suicide();
            return 1;
         }
      }
      return 0;
   }
   destroyEvents() {
      this.AI.destroyEvents();
   }
}
