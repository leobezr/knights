import AI from "@/views/HuntingGround/shared/utils/AI.js";
import HealthBar from "@/views/HuntingGround/shared/utils/healthbar.js";
import DamageCounter from "@/views/HuntingGround/shared/utils/damageCounter.js";
import MonsterBody from "@/views/HuntingGround/shared/utils/monsterBody.js";
import { Howl } from "howler";

export default class {
   constructor(props) {
      this.id = props.id
      this.monster = null;
      this.misc = props.spriteProp

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
      }, 630);
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
         this.monster.frameSpeed(SPEED);

         let timer = ATTACK_SPEED;

         if (canAttack) {
            this._attackSound();
            this.AI.dealDamage();
            canAttack = false;

            setTimeout(() => canAttack = true, timer);
         }
      }
      const attackReleaseFn = () => {
         this.monster.frameSpeed(14);
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
         let playerPosY = this.monster.location().y;

         this.monster.frameSpeed(14);
         this.monster.animation("walkingUp");

         if (playerPosY >= 0) {
            this.monster.move(null, playerPosY - SPEED);
         } else {
            this.monster.move(null, 0);
         }
      })
      this.AI.onDown(() => {
         if (this.stats.hp == 0) return;
         let playerPosY = this.monster.location().y;

         this.monster.frameSpeed(14);
         this.monster.animation("walkingDown");

         if (playerPosY <= (containerMaxHeight - 120)) {
            this.monster.move(null, playerPosY + SPEED);
         } else {
            this.monster.move(null, containerMaxHeight - 120);
         }
      })
      this.AI.onRight(() => {
         if (this.stats.hp == 0) return;
         let playerPosX = this.monster.location().x;

         this.monster.frameSpeed(14);
         this.monster.animation("walkingRight");

         if (playerPosX < (containerMaxWidth - 120)) {
            this.monster.move(playerPosX + SPEED);
         } else {
            this.monster.move(containerMaxWidth - 120);
         }
      })
      this.AI.onLeft(() => {
         if (this.stats.hp == 0) return;
         let playerPosX = this.monster.location().x;

         this.monster.frameSpeed(14);
         this.monster.animation("walkingLeft");

         if (playerPosX >= 0) {
            this.monster.move(playerPosX - SPEED);
         } else {
            this.monster.move(0);
         }
      })
      this.AI.onRelease(() => {
         this.monster.frameSpeed(14);
      })
   }
   async init() {
      const MONSTER = new MonsterBody({
         sprite: this.config.sprite,
         misc: { ...this.misc, container: this.config.container }
      });

      this.monster = await MONSTER.load(this.config.layer);
      this.config.grid = this.monster.config.grid;

      this._setHealthBar();
      this._setDamageCounter();
      this._setControles();

      return { sprite: this.monster, config: this };
   }
   /**
    * When a monster hits the character, it should take damage
    * @param {Number} damage
    */
   takeDamage(damage) {
      damage = damage > 0 ? damage : 1;
      if (this.stats.dead) return;

      this.damageCounter.animate(damage, "monster");

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
