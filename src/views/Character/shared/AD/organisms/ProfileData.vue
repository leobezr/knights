<template>
   <div id="profileData">
      <CardBody title="Profile Data" index="1">
         <template v-slot:content>
            <div class="grid-container">
               <div class="wrapGrid">
                  <div class="itens characterSprite">
                     <div class="controller">
                        <v-btn
                           icon
                           color="primary"
                           @click="changeCharacterView"
                        >
                           <v-icon>mdi-bag-personal</v-icon>
                        </v-btn>
                     </div>
                     <Sprite size="medium" v-if="characterView" />
                     <CharacterEquip v-else />
                  </div>
                  <GoldPlaceholder />
               </div>
               <div class="characterInfo">
                  <ProfileInfo />
                  <CharacterStatus />
               </div>
            </div>
         </template>
      </CardBody>
   </div>
</template>

<script>
import Sprite from "@/shared/components/AD/atoms/Sprite.vue";
import CardBody from "@/shared/components/AD/atoms/CardBody.vue";
import ProfileInfo from "@/views/Character/shared/AD/atoms/ProfileInfo.vue";
import CharacterStatus from "@/views/Character/shared/AD/atoms/CharacterStatus.vue";
import GoldPlaceholder from "@/views/Character/shared/AD/atoms/GoldPlaceholder.vue";
import CharacterEquip from "@/views/Character/shared/AD/atoms/CharacterEquip.vue";

export default {
   name: "ProfileData",
   data() {
      return {
         characterView: true,
      };
   },
   methods: {
      changeCharacterView() {
         this.characterView = !this.characterView;
      },
   },
   components: {
      Sprite,
      CardBody,
      ProfileInfo,
      CharacterStatus,
      GoldPlaceholder,
      CharacterEquip,
   },
};
</script>
