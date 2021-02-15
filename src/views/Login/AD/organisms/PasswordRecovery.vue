<template>
   <div class="sidebarControllerType">
      <div class="sidebarControllerHeader">
         <h3>Recover password.</h3>
      </div>
      <div class="sidebarControllerForm">
         <v-form ref="Login">
            <v-text-field
               outlined
               color="primary"
               label="E-mail"
               hide-details
               dense
               dark
            />
            <div class="controllers">
               <div class="links">
                  <ul>
                     <li>
                        <v-btn small @click="login" text dark>Go back</v-btn>
                     </li>
                  </ul>
               </div>
               <v-btn color="primary">Recover</v-btn>
            </div>
         </v-form>
      </div>
   </div>
</template>

<script>
export default {
   name: "PasswordRecovery",
   data() {
      return {

      };
   },
   props: {
      "change-scene": {
         type: Function,
         required: true,
      },
   },
   methods: {
      login() {
         this.changeScene("login");
      },
   },
};
</script>
