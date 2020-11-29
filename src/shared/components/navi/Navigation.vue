<template>
   <div id="navigation">
      <Topbar />
      <router-view />
   </div>
</template>

<script>
import Topbar from "@/shared/components/Topbar";

export default {
   components: {
      Topbar,
   },
};
</script>
