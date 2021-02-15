<template>
   <div class="sidebarControllerType">
      <div class="sidebarControllerForm confirmation">
         <div
            class="emailConfirmation"
            v-if="emailConfirmation && !requestLoading"
         >
            <h2>Welcome!</h2>
            <span class="midContent mt-10">
               <h3>Account confirmed.</h3>
               <p>You can now access your account</p>
            </span>
            <v-btn color="primary" @click="sendToLogin" text
               >Access account</v-btn
            >
         </div>
         <div
            class="passwordReset"
            v-else-if="passwordConfirmation && !requestLoading"
         >
            <h2>Success!</h2>
            <span class="midContent mt-10">
               <h3>Password reset.</h3>
               <p>You can now access your account</p>
            </span>
            <v-btn color="primary" @click="sendToLogin" text
               >Access account</v-btn
            >
         </div>
         <div v-else>
            <v-progress-circular
               indeterminate
               color="primary"
            />
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: "ConfirmRequest",
   data() {
      return {
         emailConfirmation: false,
         passwordConfirmation: false,
         requestLoading: true,
      };
   },
   props: {
      "change-scene": {
         type: Function,
         required: true,
      },
   },
   methods: {
      getParams() {
         const PARAM = this.$route.params?.request;

         if (PARAM) {
            if (PARAM.includes("em")) {
               this.emailConfirmation = true;
            } else if (PARAM.includes("pas")) {
               this.passwordConfirmation = true;
            }
         } else {
            this.changeScene("login");
         }
      },
      sendToLogin() {
         this.$router.replace({ name: "Login", params: { request: null } });
         this.changeScene("login");
      },
      init() {
         this.getParams();
      },
   },
   created() {
      this.init();
   },
};
</script>
