import Konva from "konva";
import Player from "@/views/HuntingGround.vue/shared/utils/player.js";
import Monster from "@/views/HuntingGround.vue/shared/utils/monster.js";

export default class {
   constructor(props) {
      this.stage = null;
      this.layer = null;

      this.config = {
         player: props.player,
         monsters: props.monsters,
      }

      this.arena = {
         player: null,
         monsters: null
      }

      this.commands = {
         win: props.actions.win,
         lose: props.actions.lose,
      }

      this.eventSetter = props.eventSetter
   }
   /**
    * Add player to map scope
    */
   async _addPlayer() {
      this.arena.player = await new Player({
         spritesheet: this.config.player.spritesheet,
         spriteProp: this.config.player,
         container: this.stage.container(),
         layer: this.layer,
         eventSetter: this.eventSetter,
         onScreenUpdate: this._onScreen.bind(this),
         commands: this.commands
      }).init()

      this._updateFrame(this.arena.player.sprite);
      this.arena.player.sprite.start();
   }
   /**
    * Add monsters to map scope
    */
   async _addMonsters() {
      this.arena.monsters = [];

      for (let creature in this.config.monsters) {
         let AI = await new Monster({
            id: creature,
            idType: this.config.monsters[creature].id,
            spritesheet: this.config.monsters[creature].spritesheet,
            spriteProp: this.config.monsters[creature],
            container: this.stage.container(),
            layer: this.layer,
            stage: this.stage,
            eventSetter: this.eventSetter,
            onScreenUpdate: this._onScreen.bind(this),
         }).init()

         this.arena.monsters.push(AI);

         this._updateFrame(this.arena.monsters[creature].sprite);
         this.arena.monsters[creature].sprite.start();
      }
   }
   /**
    * Updates Konva frame
    * @param {Object} layer
    */
   _updateFrame(layer) {
      this.layer.add(layer)
      this.stage.add(this.layer);
      this.layer.draw();
   }
   /**
    * Every on-screen player and monster instance
    */
   _onScreen() {
      return this.arena;
   }
   /**
    * Vue beforeDestroy lifecycle calls this method and cleans
    * Child intervals and loops
    */
   destroyEvents() {
      this.arena.player.config.destroyEvents();
      this.arena.player.sprite.remove();

      for (let creature in this.arena.monsters) {
         this.arena.monsters[creature].config.destroyEvents();
         this.arena.monsters[creature].sprite.remove();
      }
   }
   /**
    * Vue beforeDestroy lifecycle calls this method and cleans
    * Child intervals and loops
    */
   cleanCache() {
      for (let creature in this.arena.monsters) {
         this.arena.monsters[creature].config.destroyEvents();
      }
   }
   /**
    * Spawn Monsters
    */
   spawnMonsters() {
      this._addMonsters();
      this.arena.player.config.resetReward()
   }
   /**
    * Called before spawnMonsters
    */
   updateMonsterList(monsterList) {
      this.config.monsters = monsterList;
   }
   /**
    * Start canvas settings
    */
   init() {
      this.stage = new Konva.Stage({
         container: 'konvaWrapper',
         width: window.innerWidth - 80,
         height: window.innerHeight,
      });

      this.layer = new Konva.Layer();

      this._addPlayer()
      this._addMonsters();
   }
}
