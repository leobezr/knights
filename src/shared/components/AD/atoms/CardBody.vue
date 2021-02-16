<template>
   <!-- Normal Card -->
   <div id="cardBody" v-if="!modal">
      <div class="card-header" v-if="title && !customTitle">
         <h3>{{ title }}</h3>
      </div>
      <div v-else-if="customTitle">
         <slot name="custom-title" />
      </div>
      <div class="card-content">
         <slot name="content" />
      </div>
   </div>
   <!-- Modal Card -->
   <div v-else id="cardBodyModal">
      <div id="cardBody">
         <div class="card-header" v-if="title || customTitle">
            <slot name="custom-title">
               <h3>{{ title }}</h3>
            </slot>
         </div>
         <div class="card-content">
            <slot name="content" />
         </div>
      </div>
   </div>
</template>

<script>
import "@/shared/scss/_cardBody.scss";
export default {
   props: {
      title: {
         type: [Boolean, String],
         default: false,
      },
      modal: {
         type: Boolean,
         default: false,
      },
      "custom-title": {
         type: Boolean,
         default: false,
      },
   },
};
</script>
