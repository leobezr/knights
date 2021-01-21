<template>
   <ul id="smallMenu">
      <v-menu top offset-y :disabled="disabled">
         <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on" :class="disabled ? 'locked' : ''">
               <slot name="content" />
            </div>
         </template>

         <v-list dark class="deep-purple darken-4">
            <v-list-item
               v-for="(menu, index) in config.repeat"
               :key="index"
               link
               @click="menu.action"
            >
               <v-list-item-title>
                  <v-icon left color="primary">{{ menu.icon }}</v-icon>
                  {{ menu.label }}
               </v-list-item-title>
            </v-list-item>
         </v-list>
      </v-menu>
   </ul>
</template>

<script>
export default {
   name: "SmallMenu",
   props: {
      config: {
         type: Object,
         required: true,
      },
      disabled: {
         type: Boolean,
         default: false,
      },
   },
};
</script>
