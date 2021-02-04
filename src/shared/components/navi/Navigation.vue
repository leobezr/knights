<template>
   <div id="navigation">
      <Topbar />
      <router-view />
   </div>
</template>

<script>
import Topbar from "@/shared/components/Topbar";
import Session from "@/shared/mixins/Session.vue";
import Soundtrack from "@/shared/mixins/Soundtrack.vue";

export default {
   components: {
      Topbar,
   },
   mixins: [Session, Soundtrack],
};
</script>
