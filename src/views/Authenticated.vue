<template>
   <div id="auth">
      <router-view></router-view>
   </div>
</template>

<script>
import Session from "@/session/localSession.js";

export default {
   data() {
      return {
         sessionId: null,
      };
   },
   computed: {
      shouldRedirect() {
         const ROUTE = this.$route.name;

         return ROUTE == "Authenticated";
      },
   },
   methods: {
      verifyAuth() {
         this.sessionId = Session.fetchSession();

         if (!this.shouldRedirect) {
            return;
         }

         if (this.sessionId) {
            this.$router
               .push({ name: "Character", params: { id: this.sessionId } })
               .catch((e) => {});
         } else {
            Session.clear();

            this.$router
               .push({ name: "KnightBuilder", params: { id: this.sessionId } })
               .catch((e) => {});
         }
      },
   },
   watch: {
      $route() {
         this.verifyAuth();
      },
   },
   created() {
      this.verifyAuth();
   },
};
</script>
