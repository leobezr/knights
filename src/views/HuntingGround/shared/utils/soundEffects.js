import { Howl } from "howler";
import Cookies from "@/shared/utils/cookie.js";

export default class {
   constructor(effect) {
      this.soundEffectVolume = Cookies.get("soundEffectVolume");
      this.defaultVolume = .1;

      this.soundEffect = new Howl({
         src: [effect],
         volume: this._toVolumeValue(this.soundEffectVolume || this.defaultVolume),
      })
   }
   _toVolumeValue(volume) {
      return volume * .001;
   }
   play() {
      this.soundEffect.play();
   }
   destroy() {
      this.soundEffect.unload();
   }
}
