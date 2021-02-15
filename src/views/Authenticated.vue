<template>
   <div id="auth">
      <div class="sidebar">
         <Sidebar />
      </div>
      <router-view></router-view>
   </div>
</template>

<script>
import Session from "@/session/localSession.js";
import Sidebar from "@/shared/components/AD/molecules/Sidebar.vue";

export default {
   data() {
      return {
         userToken: null,
      };
   },
   components: {
      Sidebar,
   },
   computed: {
      shouldRedirect() {
         const ROUTE = this.$route.name;

         return ROUTE == "Authenticated";
      },
   },
   methods: {
      verifyAuth() {
         this.userToken = Session.fetchSession();

         if (!this.shouldRedirect) {
            return;
         }

         if (this.userToken) {
            this.$router
               .push({ name: "Character", params: { id: this.userToken } })
               .catch((e) => {});
         } else {
            Session.clear();

            this.$router.push({ name: "Login" }).catch((e) => {});
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
