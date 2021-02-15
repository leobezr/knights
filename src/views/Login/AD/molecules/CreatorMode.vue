<template>
   <div class="creatorMode">
      <v-form ref="CreatorForm">
         <v-text-field
            v-model="characterData.name"
            outlined
            color="primary"
            label="Nickname"
            :rules="rules.nickname"
            hide-details
            dense
            dark
         />
         <div class="checkboxList">
            <v-radio-group
               label="Vocations"
               :rules="[(v) => !!v]"
               v-model="characterData.vocation"
               hide-details
               dark
               color="primary"
            >
               <v-radio
                  v-for="(vocation, index) in vocationPermission"
                  :label="vocation"
                  color="primary"
                  :value="vocation"
                  :key="index"
               />
            </v-radio-group>
            <v-radio-group
               label="Gender"
               v-model="characterData.gender"
               :rules="[(v) => !!v]"
               hide-details
               dark
               color="primary"
            >
               <v-radio
                  v-for="(gender, index) in genderList"
                  :label="gender"
                  color="primary"
                  :value="gender"
                  :key="index"
               ></v-radio>
            </v-radio-group>
         </div>
         <div class="controller justify-end mt-0">
            <v-btn text dark small @click="cancel"> Go back </v-btn>
            <v-btn
               color="primary"
               small
               :loading="creatingCharacter"
               @click="requestCreation"
            >
               <span>Create</span>
            </v-btn>
         </div>
      </v-form>
      <Warning ref="Warning" />
   </div>
</template>

<script>
import formValidator from "@/shared/utils/formValidator.js";
import Warning from "@/shared/components/AD/atoms/Warning.vue";
import { mapActions, mapState } from "vuex";
export default {
   name: "CreatorMode",
   data() {
      return {
         creatingCharacter: false,
         genderList: ["male", "female"],
         characterData: {
            name: "",
            vocation: "",
            gender: "",
         },
      };
   },
   components: {
      Warning,
   },
   computed: {
      ...mapState({
         vocationPermission: (store) => store.User.userData.permissions,
      }),

      rules: () => formValidator,
   },
   methods: {
      ...mapActions(["createCharacter", "getCharList"]),

      async requestCreation() {
         if (this.$refs.CreatorForm.validate()) {
            this.creatingCharacter = true;

            try {
               await this.createCharacter(this.characterData);
               this.success();
            } catch (err) {
               this.creatingCharacter = false;
               this.$refs.Warning.throw(
                  err?.response?.data?.detail || "Invalid name"
               );
            }
         }
      },
      async success() {
         this.$refs.Warning.success("Character created");
         this.$refs.CreatorForm.reset();
         this.$refs.CreatorForm.resetValidation();
         await this.getCharList();

         this.creatingCharacter = false;
         setTimeout(() => this.cancel(), 500);
      },
   },
   props: {
      cancel: {
         type: Function,
         required: true,
      },
   },
};
</script>
