<template>
   <div class="tabs">
      <!--  -->
      <!-- Tabs -->
      <v-tabs
         v-model="tab"
         background-color="blue-grey darken-4 accent-4"
         centered
         color="primary"
         icons-and-text
         delimiter-icon="mdi-minus"
         @change="changeGender"
      >
         <v-tabs-slider></v-tabs-slider>

         <v-tab href="#female">
            <v-icon>mdi-gender-female</v-icon>
         </v-tab>

         <v-tab href="#male">
            <v-icon>mdi-gender-male</v-icon>
         </v-tab>
      </v-tabs>
      <!--  -->
      <!-- Tab Items -->
      <v-tabs-items v-model="tab" dark>
         <v-tab-item value="female">
            <v-card flat>
               <div class="wrapCard">
                  <GenderOptions
                     v-if="isFemale"
                     :update="updateSprite"
                     :gender="tab"
                     :user="user"
                     :ref="tab"
                  />
               </div>
            </v-card>
         </v-tab-item>
         <v-tab-item value="male">
            <div class="wrapCard">
               <GenderOptions
                  v-if="!isFemale"
                  :update="updateSprite"
                  :gender="tab"
                  :user="user"
                  :ref="tab"
               />
            </div>
         </v-tab-item>
      </v-tabs-items>
      <!--  -->
      <!-- Tab Controller -->
      <div class="tabsController">
         <v-form ref="nameForm" class="pt-2">
            <v-text-field
               label="Character Name"
               v-model="user.name"
               @input.native="validateName"
               hide-details
               dense
               filled
               autofocus
               :disabled="loading"
               :loading="loading"
               outlined
               dark
               color="primary"
               class="mr-3"
               :counter="5"
               :rules="rule.text"
            />
            <v-btn color="primary" :loading="loading" @click="createCharacter"
               >Create</v-btn
            >
         </v-form>
      </div>
   </div>
</template>

<script>
import GenderOptions from "./GenderOptions";
import Rule from "@/shared/utils/formValidator";
import { mapActions } from "vuex";

export default {
   name: "Tabs",
   data() {
      return {
         tab: "female",
         user: {
            name: "",
            sprite: 0,
            gender: "female",
         },
         loading: false,
      };
   },
   components: {
      GenderOptions,
   },
   computed: {
      rule: () => Rule,
      isFemale() {
         return this.tab == "female";
      },
   },
   methods: {
      ...mapActions(["createKnight"]),

      changeGender() {
         this.user.gender = this.tab;
         this.user.sprite = 0;
      },
      updateSprite(num) {
         this.user.sprite = num;
      },
      validateName() {
         if (this.user.name.length >= 15) {
            this.user.name = this.user.name.slice(0, 15);
         }
      },
      createCharacter() {
         const FORM = this.$refs.nameForm;

         if (FORM.validate()) {
            this.loading = true;
            this.createKnight(this.user)
               .then((req) =>
                  this.$router
                     .push({
                        name: "Character",
                        params: { id: req.id },
                     })
                     .catch((e) => {})
               )
               .catch((e) => {
                  throw new Error(e);
               })
               .finally(() => (this.loading = false));
         }
      },
   },
};
</script>
