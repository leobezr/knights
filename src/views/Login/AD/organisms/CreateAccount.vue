<template>
   <div class="sidebarControllerType">
      <div class="sidebarControllerHeader">
         <h3>Create Account.</h3>
      </div>
      <div class="sidebarControllerForm">
         <v-form ref="CreateUser" @keyup.enter.native="createUserAccount">
            <v-text-field
               v-model="credential.email"
               outlined
               color="primary"
               label="E-mail"
               hide-details
               :rules="rules.email"
               dense
               dark
            />
            <v-text-field
               v-model="credential.password"
               outlined
               color="primary"
               dense
               label="Password"
               :rules="rules.text"
               hide-details
               :type="hidePassword ? 'password' : 'text'"
               dark
            />
            <v-text-field
               v-model="confirmPassword"
               outlined
               color="primary"
               dense
               label="Confirm Password"
               :rules="confirmPasswordRule"
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
                        <v-btn small @click="goBack" text dark>Go back</v-btn>
                     </li>
                  </ul>
               </div>
               <v-btn
                  color="primary"
                  @click="createUserAccount"
                  :loading="formLoading"
                  >Create Account</v-btn
               >
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
   name: "CreateAccount",
   data() {
      return {
         hidePassword: true,
         credential: {
            email: "",
            password: "",
         },
         confirmPassword: "",
         formLoading: false,
      };
   },
   components: {
      Warning,
   },
   computed: {
      rules: () => formValidator,
      confirmPasswordRule() {
         if (this.credential.password != this.confirmPassword) {
            return [() => "Passwords don't match"];
         } else {
            return this.rules.text;
         }
      },
   },
   props: {
      "change-scene": {
         type: Function,
         required: true,
      },
   },
   methods: {
      ...mapActions(["createUser"]),

      getNewPassword() {
         this.changeScene("forgotPassword");
      },
      goBack() {
         this.changeScene("login");
      },
      success() {
         this.$refs.Warning.success("Account created");
         this.$refs.CreateUser.reset();
         this.$refs.CreateUser.resetValidation();

         this.formLoading = false;
         setTimeout(() => this.changeScene("login"), 500);
      },
      async createUserAccount() {
         if (this.$refs.CreateUser.validate()) {
            this.formLoading = true;

            try {
               await this.createUser(this.credential);
               this.success();
            } catch (err) {
               this.formLoading = false;
               this.$refs.Warning.throw(err?.response?.data?.detail);
            }
         }
      },
   },
};
</script>
