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
         <ul>
            <li>
               <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                     <span class="circleBackground" v-bind="attrs" v-on="on">
                        <v-icon color="white">mdi-face-profile</v-icon>
                     </span>
                  </template>
                  <span>Profile</span>
               </v-tooltip>
            </li>
            <li>
               <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                     <span class="circleBackground" v-bind="attrs" v-on="on">
                        <v-icon color="white">mdi-logout-variant</v-icon>
                     </span>
                  </template>
                  <span>Signout</span>
               </v-tooltip>
            </li>
         </ul>
      </div>
   </div>
</template>

<script>
import "@/shared/scss/_sidebar.scss";
import { mapGetters } from "vuex";

export default {
   name: "Sidebar",
   computed: {
      ...mapGetters(["persona"]),

      characterName() {
         if (this.persona) {
            return this.persona.name;
         } else {
            return "Unknown user";
         }
      },
   },
};
</script>
