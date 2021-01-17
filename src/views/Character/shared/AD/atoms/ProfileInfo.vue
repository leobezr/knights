<template>
  <div id="profileInfo" class="mb-5">
    <strong>Character Info</strong>
    <div class="nickname mt-3">
      <v-text-field
        label="Nickname"
        dark
        outlined
        :value="user.nickname"
        dense
        hide-details
        color="primary"
        readonly
      />
    </div>
    <div class="gender-and-age mt-3">
      <v-text-field
        label="Gender"
        dark
        outlined
        :value="user.gender"
        dense
        hide-details
        color="primary"
        readonly
      />
      <v-text-field
        label="Age"
        dark
        :value="characterAge"
        outlined
        dense
        hide-details
        color="primary"
        readonly
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ageCalculator from "@/views/Character/shared/utils/ageCalculator.js";

export default {
  name: "ProfileInfo",
  data() {
    return {
      user: null,
    };
  },
  computed: {
    ...mapGetters(["persona"]),

    characterAge() {
      return ageCalculator(this.user.birthday);
    },
  },
  created() {
    this.user = this.persona;
  },
};
</script>