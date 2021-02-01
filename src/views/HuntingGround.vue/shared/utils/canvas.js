import Konva from "konva";
import Player from "@/views/HuntingGround.vue/shared/utils/player.js";

export default class {
   constructor(props) {
      this.stage = null;
      this.layer = null;

      this.config = {
         player: props.player,
         monsters: props.monsters,
      }

      this.arena = {
         players: null,
         monsters: null
      }

      this.eventSetter = props.eventSetter
   }
   _updateFrame(layer) {
      this.layer.add(layer)
      this.stage.add(this.layer);
      this.layer.draw();
   }
   async _configSprites() {
      const PLAYER = await new Player({
         spritesheet: this.config.player.spritesheet,
         spriteProp: this.config.player,
         container: this.stage.container(),
         layer: this.layer,
         eventSetter: this.eventSetter
      }).init()

      this._updateFrame(PLAYER);
      PLAYER.start();
   }
   init() {
      this.stage = new Konva.Stage({
         container: 'konvaWrapper',
         width: window.innerWidth - 80,
         height: window.innerHeight,
      });

      this.layer = new Konva.Layer();

      this._configSprites()
   }
}
