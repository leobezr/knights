<template>
   <div class="sidebarControllerType">
      <div class="sidebarControllerHeader">
         <h3>Login.</h3>
      </div>
      <div class="sidebarControllerForm">
         <v-form ref="Login" @keyup.enter.native="loginTry">
            <v-text-field
               v-model="credential.email"
               outlined
               color="primary"
               label="E-mail"
               hide-details
               dense
               dark
            />
            <v-text-field
               v-model="credential.password"
               outlined
               color="primary"
               dense
               label="Password"
               hide-details
               :type="hidePassword ? 'password' : 'text'"
               dark
            >
               <template v-slot:append>
                  <v-btn
                     icon
                     small
                     @click="() => (hidePassword = !hidePassword)"
                  >
                     <v-icon small v-if="hidePassword">mdi-eye-outline</v-icon>
                     <v-icon small v-else>mdi-eye-off-outline</v-icon>
                  </v-btn>
               </template>
            </v-text-field>
            <div class="controllers">
               <div class="links">
                  <ul>
                     <li>
                        <v-btn small @click="getNewPassword" text dark
                           >Forgot my password</v-btn
                        >
                     </li>
                     <li>
                        <v-btn small @click="createNewAccount" text dark
                           >Create account</v-btn
                        >
                     </li>
                  </ul>
               </div>
               <v-btn color="primary" @click="loginTry">Login</v-btn>
            </div>
         </v-form>
      </div>
      <Warning ref="Warning" />
   </div>
</template>

<script>
import formValidator from "@/shared/utils/formValidator.js";
import Warning from "@/shared/components/AD/atoms/Warning.vue";
import { mapActions } from "vuex";

export default {
   name: "Login",
   data() {
      return {
         hidePassword: true,
         loginLoading: false,
         credential: {
            email: "",
            password: "",
         },
      };
   },
   components: {
      Warning,
   },
   computed: {
      rules: () => formValidator,
   },
   props: {
      "change-scene": {
         type: Function,
         required: true,
      },
   },
   methods: {
      ...mapActions(["loginUser"]),

      getNewPassword() {
         this.changeScene("forgotPassword");
      },
      createNewAccount() {
         this.changeScene("createAccount");
      },
      success() {
         this.$refs.Login.reset();
         this.$refs.Login.resetValidation();
         this.changeScene("charList");
      },
      async loginTry() {
         if (this.$refs.Login.validate()) {
            this.loginLoading = true;

            try {
               await this.loginUser(this.credential);
               this.success();
            } catch (err) {
               this.loginLoading = false;
               this.$refs.Warning.throw(err?.response?.data?.detail);
            }
         }
      },
   },
};
</script>
