<template>
   <div id="navigation">
      <router-view />
   </div>
</template>

<script>
import Session from "@/shared/mixins/Session.vue";
import Soundtrack from "@/shared/mixins/Soundtrack.vue";

export default {
   mixins: [Session, Soundtrack],
};
</script>
