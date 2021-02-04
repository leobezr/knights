<template>
   <div id="sidebar">
      <div class="userInfo">
         <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
               <v-avatar v-bind="attrs" v-on="on">
                  <img
                     src="https://cdn.vuetifyjs.com/images/john.jpg"
                     alt="John"
                  />
               </v-avatar>
            </template>
            <span>{{ characterName }}</span>
         </v-tooltip>
      </div>
      <div class="menu-nav">
         <SidebarLinks :links="sidebarLinks" />
      </div>
   </div>
</template>

<script>
import "@/shared/scss/_sidebar.scss";
import { mapGetters } from "vuex";
import SidebarLinks from "@/shared/components/AD/atoms/SidebarLinks.vue";

export default {
   name: "Sidebar",
   data() {
      return {
         sessionId: null,
      };
   },
   components: {
      SidebarLinks,
   },
   computed: {
      ...mapGetters(["persona"]),

      characterName() {
         if (this.persona) {
            return this.persona.nickname;
         } else {
            return "Unknown user";
         }
      },
      sidebarLinks() {
         return [
            {
               icon: "mdi-face-woman-shimmer-outline",
               link: "Character",
               params: {
                  id: this.sessionId,
               },
               label: "Profile",
            },
            { icon: "mdi-treasure-chest", link: "Store", label: "Store" },
            { icon: "mdi-ghost", link: "Hunts", label: "Hunts" },
            { icon: "mdi-sword-cross", link: "HuntingGround", label: "Arena" },
            {
               icon: "mdi-logout-variant",
               action: this.signout,
               label: "Signout",
            },
         ];
      },
   },
   methods: {
      signout() {
         localStorage.clear();

         this.$router.push({ name: "KnightBuilder" }).catch(() => {});
      },
   },
   watch: {
      $route: {
         handler() {
            this.sessionId = localStorage.sessionId;
         },
      },
   },
};
</script>
