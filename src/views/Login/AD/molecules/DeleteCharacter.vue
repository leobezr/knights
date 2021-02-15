<template>
   <div class="creatorMode">
      <v-form ref="CreatorForm">
         <v-text-field
            v-model="characterData.name"
            outlined
            color="primary"
            label="Character Nickname"
            :rules="rules.nickname"
            hide-details
            dense
            dark
            class="mb-2"
         />
         <v-text-field
            v-model="characterData.password"
            outlined
            color="primary"
            label="Password"
            :rules="rules.text"
            hide-details
            dense
            dark
            class="mb-5"
         />
         <div class="controller justify-end mt-0">
            <v-btn text dark small @click="cancel"> Go back </v-btn>
            <v-btn
               color="primary"
               small
               :loading="deletingCharacter"
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
   name: "DeleteCharacter",
   data() {
      return {
         deletingCharacter: false,
         characterData: {
            name: "",
            password: "",
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
      ...mapActions(["createCharacter"]),

      async requestCreation() {
         if (this.$refs.CreatorForm.validate()) {
            this.deletingCharacter = true;

            try {
               await this.createCharacter(this.characterData);
               this.success();
            } catch (err) {
               this.deletingCharacter = false;
               this.$refs.Warning.throw(
                  err?.response?.data?.detail || "Invalid name"
               );
            }
         }
      },
      success() {
         this.$refs.Warning.success("Character created");
         this.$refs.CreatorForm.reset();
         this.$refs.CreatorForm.resetValidation();

         this.deletingCharacter = false;
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
