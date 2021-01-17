<template>
  <div id="characterStatus" class="mt-3">
    <strong>Character Status</strong>

    <div class="table-grid mt-2" v-if="attribute">
      <div class="table-stats">
          <div class="line">
          <strong>HIT</strong>
          <span>{{ attribute.hit }}</span>
        </div>
        <div class="line">
          <strong>ATK</strong>
          <span>{{ attribute.atk }}</span>
        </div>
        <div class="line">
          <strong>DEF</strong>
          <span>{{ attribute.def }}</span>
        </div>
        <div class="line">
          <strong>HP</strong>
          <span>{{ `${attribute.hp.value} / ${attribute.hp.total}` }}</span>
        </div>
      </div>

      <div class="table-stats">
        <div class="line">
          <strong>STR</strong>
          <span>{{ attribute.str }}</span>
        </div>
        <div class="line">
          <strong>VIT</strong>
          <span>{{ attribute.vit }}</span>
        </div>
        <div class="line">
          <strong>AGI</strong>
          <span>{{ attribute.agi }}</span>
        </div>
        <div class="line">
          <strong>LUK</strong>
          <span>{{ attribute.luk }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "CharacterStatus",
  data() {
    return {
      user: null  
    }
  },
  computed: {
    ...mapGetters(["persona"]),

    attribute() {
      return this.user?.attributes ?? {}
    }
  },
  created() {
    this.user = { ...this.persona };
  }
};
</script>