<template>
  <div id="profileData">
    <CardBody title="Profile Data" index="1">
      <div class="grid-container">
        <Sprite size="medium" />
        <div class="characterInfo">
          <ProfileInfo />
          <CharacterStatus />
        </div>
      </div>
    </CardBody>
  </div>
</template>

<script>
import Sprite from "@/shared/components/AD/atoms/Sprite.vue";
import CardBody from "@/shared/components/AD/atoms/CardBody.vue";
import ProfileInfo from "@/views/Character/shared/AD/atoms/ProfileInfo.vue";
import CharacterStatus from "@/views/Character/shared/AD/atoms/CharacterStatus.vue";

export default {
  name: "ProfileData",
  components: {
    Sprite,
    CardBody,
    ProfileInfo,
    CharacterStatus,
  },
};
</script>