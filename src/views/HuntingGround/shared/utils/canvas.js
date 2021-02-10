import Konva from "konva";
import Player from "@/views/HuntingGround/shared/utils/player.js";
import Monster from "@/views/HuntingGround/shared/utils/monster.js";

export default class {
   constructor(props) {
      this.stage = null;
      this.layer = null;

      this.config = {
         playerProps: props.playerProps,
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

      this.mouseCord = {
         x: 0,
         y: 0,
      }
   }
   /**
    * Add player to map scope
    */
   async _addPlayer() {
      this.arena.player = await new Player({
         playerProps: this.config.playerProps,
         container: this.stage.container(),
         layer: this.layer,
         onScreenUpdate: this._onScreen.bind(this),
         commands: this.commands,
      }).init()

      for (let children in this.arena.player.sprite.getChildren()) {
         let child = this.arena.player.sprite[children];

         if (child.top || child.middle || child.lower) {
            for (let headgear in child) {
               this.layer.add(child[headgear]);
            }
         } else {
            this.layer.add(child);
         }

      }

      this._updateFrame();
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
            onScreenUpdate: this._onScreen.bind(this),
         }).init()

         this.arena.monsters.push(AI);

         this.layer.add(this.arena.monsters[creature].sprite.body);

         this._updateFrame();
         this.arena.monsters[creature].sprite.start();
      }
   }
   /**
    * Updates Konva frame
    * @param {Object} layer
    */
   _updateFrame() {
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
   async init() {
      this.stage = new Konva.Stage({
         container: 'konvaWrapper',
         width: window.innerWidth - 80,
         height: window.innerHeight,
      });

      this.layer = new Konva.Layer();

      await this._addPlayer()
      this._addMonsters();
   }
}
