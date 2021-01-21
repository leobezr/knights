<template>
   <v-tooltip
      bottom
      color="deep-purple darken-4"
      transition="slide-y-reverse-transition"
   >
      <template v-slot:activator="{ on, attrs }">
         <div v-bind="attrs" v-on="on">
            <slot name="content" />
         </div>
      </template>
      <span>{{ label }}</span>
   </v-tooltip>
</template>

<script>
export default {
   name: "TooltipAtom",
   props: {
      label: {
         type: String,
         required: true,
      },
   },
};
</script>
