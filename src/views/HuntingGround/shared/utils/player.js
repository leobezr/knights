import Controller from "@/views/HuntingGround/shared/utils/controller.js";
import HealthBar from "@/views/HuntingGround/shared/utils/healthbar.js";
import CharacterRange from "@/views/HuntingGround/shared/utils/characterRange.js";
import DamageCounter from "@/views/HuntingGround/shared/utils/damageCounter.js";
import PlayerBody from "@/views/HuntingGround/shared/utils/playerBody.js";
import ClassEffects from "@/views/HuntingGround/shared/utils/classEffects.js";
import vocationMechanics from "@/shared/mechanics/vocationMechanics.js";
import SoundEffect from "@/views/HuntingGround/shared/utils/soundEffects.js";

export default class {
   constructor(props) {
      this.player = null;

      this.config = {
         attackRange: props.playerProps.misc.attackRange || 20,
         lifeSteal: props.playerProps.misc.lifeSteal || 0,
         container: props.container,
         layer: props.layer,
         stage: props.stage,
         vocation: props.playerProps.vocation,
         gender: props.playerProps.gender,
         grid: {
            width: 0,
            height: 0
         },
      }

      const stats = props.playerProps.stats;

      this.stats = {
         dead: false,
         hp: stats.attributes.hp,
         maxHp: stats.attributes.hp,
         damage: stats.attributes.hit,
         def: stats.attributes.def,
         agi: Math.floor(stats.attributes.agi + stats.modifier.agi),
         luk: Math.floor(stats.attributes.luk + stats.modifier.luk),
         speed: Math.floor((stats.attributes.agi + stats.modifier.agi) * .065),
         all: { ...stats }
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
      this.controller = null;
      this.killCounter = 0;
      this.killScript = false;

      this.mechanics = {
         isAttacking: false,
         collisionBox: null,
      }

      this.circle = null;
   }
   _generateVocationAttackEffect() {
      this.mechanics.collisionBox = new ClassEffects({
         vocation: this.config.vocation,
         player: this.player,
         playerRange: this.config.attackRange
      })

      this.mechanics.collisionBox.updateFrame();
   }
   _dmgCalculator(enemy) {
      const balanceDamage = 4000;

      let selfDamage = this.stats.damage;
      let enemyArmor = enemy.config.stats.def
      let damage = Math.round(selfDamage * (balanceDamage + enemyArmor) / (balanceDamage + enemyArmor * 10));

      return damage;
   }
   _applyLifeSteal(damage) {
      if (!this.config.lifeSteal) return;

      let currentHp = this.stats.hp;

      let lifeStealPercent = this.config.lifeSteal * .01;
      let lifeStolen = Math.round(damage * lifeStealPercent);

      currentHp += lifeStolen;

      if (currentHp > this.stats.maxHp) {
         currentHp = this.stats.maxHp;
      }

      this.stats.hp = currentHp;
      this.healthBar.updateHpStatus(this.stats.hp);
      this.damageCounter.animate(lifeStolen, "heal");
   }
   _attackAllCreatures(list) {
      if (this.stats.dead) return;
      let creatureInRange = list.filter(creature => creature.config.stats.hp > 0);
      if (!creatureInRange) return;

      let totalLifeSteal = 0;
      for (let attackTime = 0; attackTime < vocationMechanics[this.config.vocation].maxTargets; attackTime++) {
         let monster = creatureInRange[attackTime];

         if (!monster) break;

         this.player.animation("attacking");
         let targetAttacked = monster.config.takeDamage(this._dmgCalculator(monster));

         if (!monster.config.stats.dead) {
            var onHit = new SoundEffect(this.player.getSound().onHit)

            onHit.play();
            setTimeout(() => onHit.destroy(), 800);
         }

         if (!this.fightLog.enemyIdKilled[monster.config.config.id]) {
            this.fightLog.enemyIdKilled[monster.config.config.id] = 0;
         }

         if (targetAttacked.dead) {
            this.fightLog.enemiesKilled += 1;
            this.fightLog.enemyIdKilled[monster.config.config.id] += 1;
         }
         totalLifeSteal += targetAttacked.damage;
      }
      this._applyLifeSteal(totalLifeSteal);


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
    * Collision rule
    * @returns All monsters inside collision box
    * Collision box is defined at PlayerBody sprite width/height
    */
   _mobColliding() {
      let boxCollider = this.player.body;
      let enemiesInArena = this.actions.updateMapPlayers().monsters;

      let enemiesColliding = [];

      for (let creature in enemiesInArena) {
         let enemy = enemiesInArena[creature].sprite.body;
         let enemyDead = enemiesInArena[creature].config.stats.dead;

         if (enemy && !enemyDead) {
            let enemyX = enemy.x();
            let enemyY = enemy.y();

            let enemyWidth = enemy.width();
            let enemyHeight = enemy.height();

            let boxColliderX = boxCollider.x()
            let boxColliderY = boxCollider.y()

            let boxColliderWidth = boxCollider.width();
            let boxColliderHeight = boxCollider.height();

            const IS_COLLIDING = boxColliderX < enemyX + enemyWidth &&
               boxColliderX + boxColliderWidth > enemyX &&
               boxColliderY < enemyY + (enemyHeight / 2) &&
               boxColliderY + boxColliderHeight / 2 > enemyY;

            if (IS_COLLIDING) enemiesColliding.push(enemy);
         }
      }

      return enemiesColliding;
   }
   /**
    * Generate attack sound
    * onHit is reserved when hitting an enemy, should not be used when missing
    */
   _attackSound() {
      var attack = new SoundEffect(this.player.getSound().attack)

      attack.play();
      setTimeout(() => attack.destroy(), 800);
   }
   /**
    * Call Controller
    */
   async _setControles() {
      this._generateVocationAttackEffect();
      this._generateCircle();

      this.mechanics.collisionBox.appendTo(this.config.layer, function () {
         this.controller = new Controller({
            updateMapPlayers: this.actions.updateMapPlayers,
            attackRange: this.config.attackRange,
            updateCollision: this._updateCollision.bind(this),
            collisionBox: this.mechanics.collisionBox,
         });

         this._movementController();
         this._attackController();
      }.bind(this));
   }
   _updateCollision(collisionList) {
      this.collision = collisionList
   }
   _generateCircle() {
      this.circle = new CharacterRange({
         layer: this.config.layer,
         attackRange: this.config.attackRange,
         player: this.player
      })
   }
   /**
    * Attack handler
    */
   _attackController() {
      let loop = null;

      const attackFn = () => {
         if (this.stats.dead) return;

         this.mechanics.isAttacking = true;
         this.mechanics.collisionBox.updateFrame()

         const SPEED = this.stats.speed <= 10 ? 10 : this.stats.speed >= 900 ? 900 : this.stats.speed;
         const ATTACK_SPEED = Math.round(7 * (1000 / SPEED));

         this.player.animation("attacking");
         this.player.frameSpeed(SPEED + (SPEED * .1));

         clearInterval(loop);
         loop = setInterval(function () {
            if (this.killScript) {
               attackReleaseFn.call();
               return;
            }

            this.mechanics.collisionBox.updateFrame()

            this.player.animation("attacking");
            this.player.frameSpeed(SPEED + (SPEED * .1));
            this._attackSound();

            const ARENA = this.actions.updateMapPlayers();
            let monsterInRange = [];

            monsterInRange = ARENA.monsters.filter(monster => this.collision.includes(monster.config.id));

            this._attackAllCreatures(monsterInRange);
         }.bind(this), ATTACK_SPEED);
      }
      const attackReleaseFn = () => {
         this.mechanics.isAttacking = false;

         this.player.animation("standing");
         this.player.frameSpeed(14);
         this.mechanics.collisionBox.animated(false);

         clearInterval(loop);
      }

      this.controller.onClick(attackFn);
      this.controller.onClickRelease(attackReleaseFn);
   }
   _stopAttacking() {
      this.killScript = true;
   }
   /**
    * Movement controller, hotkeys and such
    */
   _movementController() {
      let containerMaxWidth = this.config.container.offsetWidth;
      let containerMaxHeight = this.config.container.offsetHeight;

      const SPEED = this.stats.speed <= 10 ? 10 : this.stats.speed >= 900 ? 900 : this.stats.speed;

      this.controller.onUp(() => {
         if (this.stats.dead) return;
         let playerPosY = this.player.location().y;

         if (this.mechanics.isAttacking) {
            this.player.frameSpeed(SPEED + (SPEED * .1));
         } else {
            this.player.frameSpeed(14);
            this.player.animation("walkingUp");
         }

         if (playerPosY >= 0) {
            this.player.move(null, playerPosY - SPEED);
         } else {
            this.player.move(null, 0);
         }
         this.circle.updatePosition();
      })
      this.controller.onDown(() => {
         if (this.stats.dead) return;
         let playerPosY = this.player.location().y;

         if (this.mechanics.isAttacking) {
            this.player.frameSpeed(SPEED + (SPEED * .1));
         } else {
            this.player.frameSpeed(14);
            this.player.animation("walkingDown");
         }

         if (playerPosY <= (containerMaxHeight - 120)) {
            this.player.move(null, playerPosY + SPEED);
         } else {
            this.player.move(null, containerMaxHeight - 120);
         }
         this.circle.updatePosition();
      })
      this.controller.onRight(() => {
         if (this.stats.dead) return;
         let playerPosX = this.player.location().x;

         if (this.mechanics.isAttacking) {
            this.player.frameSpeed(SPEED + (SPEED * .1));
         } else {
            this.player.frameSpeed(14);
            this.player.animation("walkingRight");
         }

         if (playerPosX < (containerMaxWidth - 120)) {
            this.player.move(playerPosX + SPEED);
         } else {
            this.player.move(containerMaxWidth - 120);
         }
         this.circle.updatePosition();
      })
      this.controller.onLeft(() => {
         if (this.stats.dead) return;
         let playerPosX = this.player.location().x;


         if (this.mechanics.isAttacking) {
            this.player.frameSpeed(SPEED + (SPEED * .1) / 2);
         } else {
            this.player.frameSpeed(14);
            this.player.animation("walkingLeft");
         }

         if (playerPosX >= 0) {
            this.player.move(playerPosX - SPEED);
         } else {
            this.player.move(0);
         }
         this.circle.updatePosition();
      })
      this.controller.onRelease(() => {
         this.player.frameSpeed(14);
         this.player.animation("standing");
      })
   }
   /**
    * Trigger player method
    * @returns {Promise}
    */
   async init() {
      const BODY = new PlayerBody({
         gender: this.config.gender,
         vocation: this.config.vocation,
         color: "default",
         head: {
            type: "standard",
            color: "black"
         }
      });

      this.player = await BODY.load(this.config.layer);
      this.config.grid = this.player.config.grid;

      this._setHealthBar();
      this._setDamageCounter();
      this._setControles();

      return { sprite: this.player, config: this };
   }
   /**
    * Vue beforeDestroy lifecycle calls this method and cleans
    * Child intervals and loops
    */
   destroyEvents() {
      this._stopAttacking();
      this.controller.destroyEvents();
      this.healthBar.destroy()
      this.mechanics.collisionBox.destroy()
   }
   resetReward() {
      this.fightLog.enemiesKilled = 0;
      this.fightLog.enemyIdKilled = {};
   }
   /**
    * When a monster hits the character, it should take damage
    * @param {Number} damage
    */
   _calculateFleeRate(damage) {
      let creaturesColliding = this._mobColliding();
      let baseLevel = this.stats.all.level,
         agi = this.stats.agi, luk = this.stats.luk,
         itemBonus = 0, skillBonus = 0,
         mobs = creaturesColliding.length;

      let fleeChance = 30 + skillBonus + (baseLevel + Math.floor(agi * .05) + Math.floor(luk * .1) / 5 + itemBonus) * (1 - ((mobs - 2) * .2))
      let hitChance = (80 - ((damage + (damage / 3)) - fleeChance));

      const RNG = () => Math.random() * 100;

      return hitChance < RNG();
   }
   takeDamage(damage) {
      damage = damage > 0 ? damage : 1;
      if (this.stats.dead) return;

      let currentHp = Math.floor(this.stats.hp - damage);

      const FLEE_CHANCE = this._calculateFleeRate(damage);

      if (FLEE_CHANCE) {
         this.damageCounter.animate(damage, "player");

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
         return damage
      } else {
         this.damageCounter.animate(0, "player");
         return 0
      }
   }
}
