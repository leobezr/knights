<template>
   <div id="monsterHunt">
      <div class="backgroundImg" :style="backgroundImage" />
      <span class="level">
         <strong>Lv.:</strong><span>{{ monsterData.level }}</span>
      </span>
      <figure class="monsterWrap">
         <img
            :src="serverPublicAddress + monsterData.gif"
            :style="`transform: scale(${monsterData.scale})`"
            :alt="monsterData.name"
         />
      </figure>
   </div>
</template>

<script>
export default {
   name: "MonsterHunt",
   computed: {
      backgroundImage() {
         return `background-image: url(${this.serverPublicAddress + this.monsterData.thumb});`;
      },
      serverPublicAddress() {
         return process.env.VUE_APP_PUBLIC;
      },
   },
   props: {
      "monster-data": {
         type: Object,
         required: true,
      },
   },
};
</script>
