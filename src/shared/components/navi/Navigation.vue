<template>
   <div id="navigation">
      <Topbar />
      <router-view />
   </div>
</template>

<script>
import Topbar from "@/shared/components/Topbar";
import Session from "@/shared/mixins/Session.vue";

export default {
   components: {
      Topbar,
   },
   mixins: [Session],
};
</script>
