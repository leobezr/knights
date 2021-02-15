<template>
   <div>
      <v-snackbar v-model="show" :timeout="time" top :color="isError">{{
         text
      }}</v-snackbar>
   </div>
</template>

<script>
export default {
   name: "Warning",
   data() {
      return {
         show: false,
         text: "",
         error: false,
      };
   },
   computed: {
      isError() {
         if (this.error) {
            return "error";
         } else {
            return "primary";
         }
      },
      time() {
         if (this.error) {
            return 4000;
         } else return 1500;
      },
   },
   methods: {
      throw(text) {
         this.text = text || "Algo deu errado";
         this.error = true;
         this.show = true;
      },
      success(text) {
         this.text = text;
         this.error = false;
         this.show = true;
      },
   },
};
</script>
