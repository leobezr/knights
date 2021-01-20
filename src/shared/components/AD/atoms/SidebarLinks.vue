<template>
   <ul id="sidebarLinks">
      <li v-for="(prop, index) in links" :key="index" @click="onClick(prop)">
         <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
               <span class="circleBackground" v-bind="attrs" v-on="on">
                  <v-icon color="white">{{ prop.icon }}</v-icon>
               </span>
            </template>
            <span>{{ prop.label }}</span>
         </v-tooltip>
      </li>
   </ul>
</template>

<script>
export default {
   name: "SidebarLinks",
   computed: {},
   methods: {
      onClick(prop) {
         let action = prop.action ?? new Function();

         if (prop.link) {
            const params = { ...prop.params };

            this.$router
               .push({ name: prop.link, ...(params && { params }) })
               .catch(() => {});
         }
         action.call();
      },
   },
   props: {
      links: {
         type: Array,
         default: () => [],
      },
   },
};
</script>
