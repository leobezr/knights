<template>
   <div class="sidebarControllerType">
      <div class="sidebarControllerHeader">
         <h3>Char List.</h3>
      </div>
      <div class="creatorMode" v-if="creatorMode">
         <CreatorMode :cancel="cancelActions" />
      </div>
      <div class="requestDelete" v-else-if="requestToDelete">
         <DeleteCharacter :cancel="cancelActions" />
      </div>
      <div class="sidebarControllerForm" v-else>
         <CustomTable
            :header="tHeader"
            :items="charList"
            append-action
            action-icon="mdi-gamepad-variant-outline"
            :action-fn="login"
         />
         <div class="controller">
            <div class="leftContainer">
               <v-btn text dark small @click="logoutAccount"> Logout </v-btn>
               <v-btn text dark small @click="deleteCharacter">
                  Delete Character
               </v-btn>
            </div>
            <v-btn
               color="primary"
               text
               small
               @click="() => (creatorMode = true)"
            >
               <span>Create</span>
            </v-btn>
         </div>
      </div>
      <Warning ref="Warning" />
   </div>
</template>

<script>
import Warning from "@/shared/components/AD/atoms/Warning.vue";
import CustomTable from "@/shared/components/AD/atoms/CustomTable.vue";
import DeleteCharacter from "@/views/Login/AD/molecules/DeleteCharacter.vue";
import CreatorMode from "@/views/Login/AD/molecules/CreatorMode.vue";
import tableHeader from "@/views/Login/shared/boilerplate/tableHeader.js";
import { mapActions, mapState } from "vuex";

export default {
   name: "CharListComponent",
   data() {
      return {
         requestingUserData: false,
         requestToDelete: false,
         creatorMode: false,
         characterLoadingData: false,
      };
   },
   components: {
      Warning,
      CreatorMode,
      DeleteCharacter,
      CustomTable,
   },
   computed: {
      ...mapState({
         charList: (state) => state.User.charList || [],
      }),

      tHeader: () => tableHeader,
   },
   props: {
      "change-scene": {
         type: Function,
         required: true,
      },
   },
   methods: {
      ...mapActions(["getUserData", "getCharList", "me"]),

      cancelActions() {
         this.creatorMode = false;
         this.requestToDelete = false;
      },
      deleteCharacter() {
         this.requestToDelete = true;
      },
      goBack() {
         this.changeScene("login");
      },
      async login(character) {
         localStorage.charToken = character.token;
         this.characterLoadingData = true;

         try {
            await this.me();
            this.characterLoadingData = false;
            this.$router.push({ name: "Character" }).catch((e) => {});
         } catch (err) {
            this.characterLoadingData = false;
            throw Error(err);
         }
      },
      logoutAccount() {
         localStorage.clear();
         this.goBack();
      },
      async requestUserData() {
         this.requestUserData = true;

         try {
            await this.getUserData();
            await this.getCharList();
            this.requestUserData = false;
         } catch (err) {
            this.$refs.Warning.throw(err?.response?.data?.detail);
            this.requestUserData = false;
         }
      },
   },
   created() {
      this.requestUserData();
   },
};
</script>
