<template>
  <div id="character">
    <div class="landscape" :style="backgroundImage">
      <div
        class="pageLoader d-flex justify-center align-center"
        style="height: 100%"
        v-if="fetchingProfileData"
      >
        <v-progress-circular indeterminate color="primary" />
      </div>
      <div class="knight-menu" v-else>
        <div class="profile">
          <ProfileData />
        </div>
        <div class="gear">
          <KnightGear />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import bgImage from "@/shared/img/blacksmith.jpg";
import ProfileData from "@/views/Character/shared/AD/organisms/ProfileData.vue";
import KnightGear from "@/views/Character/shared/AD/organisms/KnightGear.vue";
import "@/views/Character/shared/scss/_character.scss";

export default {
  name: "CharacterProfile",
  data() {
    return {
      fetchingProfileData: false,
    };
  },
  computed: {
    backgroundImage() {
      return `background-image: url(${bgImage});`;
    },
  },
  components: {
    ProfileData,
    KnightGear
  },
  methods: {
    ...mapActions(["me"]),

    init() {
      this.fetchingProfileData = true;

      this.setSession();

        this.me().finally(() => (this.fetchingProfileData = false));
    },
    setSession() {
      const ROUTE = this.$route;

      if (ROUTE?.params?.id) {
        localStorage.userToken = ROUTE.params.id;
      }
    },
  },
  created() {
    this.init();
  },
};
</script>
