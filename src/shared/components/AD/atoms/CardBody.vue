<template>
  <div id="cardBody">
    <div class="card-header" v-if="title">
      <h3>{{ title }}</h3>
    </div>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<script>
import "@/shared/scss/_cardBody.scss";
export default {
  props: {
    title: {
      type: [Boolean, String],
      default: false,
    },
  },
};
</script>