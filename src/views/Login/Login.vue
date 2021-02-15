<template>
   <div id="login">
      <div class="landscape" :darken="darkBackground" :style="backgroundImage">
         <div class="containerWrap">
            <div class="containerLeft">
               <figure>
                  <img :src="logo" alt="KnightsRPG" />
               </figure>
            </div>
            <div class="containerRight" :isRequest="userConfirmRequest">
               <div class="userHasLogin" v-if="userHasLogin">
                  <UserLogin :change-scene="changeScene" />
               </div>
               <div class="userConfirmAccount" v-else-if="passwordRecovery">
                  <PasswordRecovery :change-scene="changeScene" />
               </div>
               <div class="requestConfirmation" v-else-if="userConfirmRequest">
                  <UserConfirmationRequest :change-scene="changeScene" />
               </div>
               <div
                  class="charListComponentWrapper"
                  v-else-if="charListComponent"
               >
                  <CharListComponent :change-scene="changeScene" />
               </div>
               <div class="userRegister" v-else>
                  <CreateAccount :change-scene="changeScene" />
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import bgImage from "@/shared/img/background.jpg";
import UserLogin from "@/views/Login/AD/organisms/UserLogin.vue";
import CreateAccount from "@/views/Login/AD/organisms/CreateAccount.vue";
import PasswordRecovery from "@/views/Login/AD/organisms/PasswordRecovery.vue";
import UserConfirmationRequest from "@/views/Login/AD/organisms/UserConfirmationRequest.vue";
import CharListComponent from "@/views/Login/AD/organisms/CharListComponent.vue";
import logoImage from "@/views/Login/shared/img/logo-white.png";
import "@/views/Login/shared/scss/_login.scss";

export default {
   name: "Login",
   data() {
      return {
         darkenLandscape: false,
         userHasLogin: true,
         passwordRecovery: false,
         userConfirmRequest: false,
         charListComponent: false,
      };
   },
   computed: {
      backgroundImage() {
         return `background-image: url(${bgImage});`;
      },
      darkBackground() {
         return this.darkenLandscape;
      },
      logo() {
         return logoImage;
      },
   },
   components: {
      UserLogin,
      CreateAccount,
      PasswordRecovery,
      UserConfirmationRequest,
      CharListComponent,
   },
   methods: {
      darkenBackground() {
         setTimeout(() => (this.darkenLandscape = true), 300);
      },
      changeScene(scene) {
         scene = scene || "login";

         this.passwordRecovery = false;
         this.userHasLogin = false;
         this.userConfirmRequest = false;
         this.charListComponent = false;

         switch (scene) {
            case "login":
               this.userHasLogin = true;
               break;
            case "forgotPassword":
               this.passwordRecovery = true;
               break;
            case "userConfirmRequest":
               this.userConfirmRequest = true;
               break;
            case "charList":
               this.charListComponent = true;
               break;
            case "createAccount":
               this.userHasLogin = false;
               break;
            default:
               throw Error("changeScene method expects a valid String Param");
         }
      },
      getParams() {
         const PARAM = this.$route.params?.request;

         if (PARAM) {
            if (PARAM.includes("em") || PARAM.includes("pas")) {
               this.changeScene("userConfirmRequest");
            }
         }
      },
      getTokenStatus() {
         if (localStorage.userToken) {
            this.changeScene("charList");
         }
      },
   },
   created() {
      this.getParams();
      this.getTokenStatus();
   },
   mounted() {
      this.darkenBackground();
   },
};
</script>
