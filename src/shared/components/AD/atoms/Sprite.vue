<template>
   <div id="sprite">
      <figure :size="size">
         <div
            class="headergear"
            :sprite="spriteValue"
            :gender="gender"
            v-if="hasHeadgear"
         >
            <img
               :src="headgearLink('headgear-top')"
               v-if="headgearLink('headgear-top')"
               alt="top-helmet"
            />
            <img
               :src="headgearLink('headgear-middle')"
               v-if="headgearLink('headgear-middle')"
               alt="middle-helmet"
            />
            <img
               :src="headgearLink('headgear-lower')"
               v-if="headgearLink('headgear-lower')"
               alt="lower-helmet"
            />
         </div>
         <img :src="characterSprite" :alt="characterName" />
      </figure>
   </div>
</template>

<script>
import { mapGetters } from "vuex";

import femaleSprites from "@/views/KnightBuilder/sprite/female/femaleExport.js";
import maleSprites from "@/views/KnightBuilder/sprite/male/maleExport.js";

import "@/shared/scss/_sprite.scss";

export default {
   name: "Sprite",
   data() {
      return {
         characterData: null,
      };
   },
   computed: {
      ...mapGetters(["persona"]),

      characterSprite() {
         let sprite = this.characterData?.sprite ?? 0;
         let gender = this.characterData?.gender ?? "female";

         switch (gender) {
            case "male":
               return Object.values(maleSprites)[sprite];
            case "female":
            default:
               return Object.values(femaleSprites)[sprite];
         }
      },
      spriteValue() {
         return this.characterData.sprite ?? 0;
      },
      gender() {
         const GENDER = this.characterData?.gender;

         if (GENDER) {
            return GENDER;
         }
         return false;
      },
      characterName() {
         return this.characterData?.nickname ?? "";
      },
      equipped() {
         return this.characterData?.equipped;
      },
      hasHeadgear() {
         if (this.equipped) {
            return (
               this.equipped["headgear-top"] ||
               this.equipped["headgear-middle"] ||
               this.equipped["headgear-lower"] ||
               false
            );
         }
         return false;
      },
      headgearLink() {
         return (helmetType) => {
            let helmetLink = this.equipped[helmetType]?.view;

            if (helmetLink) {
               return process.env.VUE_APP_PUBLIC + helmetLink;
            } else {
               return false;
            }
         };
      },
   },
   props: {
      size: {
         type: String,
         default: "small",
      },
   },
   created() {
      this.characterData = this.persona;
   },
   watch: {
      persona: {
         handler() {
            this.characterData = this.persona;
         },
      },
   },
};
</script>
