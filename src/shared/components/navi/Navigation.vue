<template>
   <div id="navigation">
      <PartyMembers v-if="auth" />
      <router-view />
   </div>
</template>

<script>
import Session from "@/shared/mixins/Session.vue";
import Soundtrack from "@/shared/mixins/Soundtrack.vue";
import PartyMembers from "@/shared/components/AD/organisms/PartyMembers.vue";

export default {
   data() {
      return {
         auth: false,
      };
   },
   mixins: [Session, Soundtrack],
   components: {
      PartyMembers,
   },
   watch: {
      $route: {
         handler() {
            this.auth = this.verifySession();
         },
      },
   },
   created() {
      this.auth = this.verifySession();
   },
};
</script>
