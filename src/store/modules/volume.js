export default {
   actions: {},
   mutations: {
      setVolume(state, props) {
         state[props.effect] = props.volume;
      }
   },
   state: {
      soundEffectVolume: 50,
      musicVolume: 50,
   },
   getters: {}
}
