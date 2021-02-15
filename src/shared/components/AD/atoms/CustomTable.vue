<template>
   <div id="customTable">
      <div class="customTableHeader">
         <slot name="header">
            <div
               class="customTableRow"
               v-for="(item, index) in header"
               :key="index"
            >
               <span class="customTableTd">
                  {{ item.text }}
               </span>
            </div>
         </slot>
      </div>
      <div class="customTableBody">
         <slot name="body">
            <div class="customTableNoContent" v-if="!items.length">No characters yet.</div>
            <div
               class="customTableRow"
               v-for="(item, index) in items"
               :key="index"
            >
               <span class="customTableTd" v-for="(head, i) in header" :key="i">
                  <span class="hasAppendedAction" v-if="appendAction">
                     <span v-if="i != header.length - 1">
                        {{ tdItem(item, head) }}
                     </span>
                     <span v-else>
                        <v-btn
                           icon
                           color="primary"
                           @click="() => actionFnCallback(item)"
                        >
                           <v-icon>{{ actionIcon }}</v-icon>
                        </v-btn>
                     </span>
                  </span>
                  <span v-else>
                     {{ tdItem(item, head) }}
                  </span>
               </span>
            </div>
         </slot>
      </div>
   </div>
</template>

<script>
import "@/shared/scss/_customTable.scss";

export default {
   name: "CustomTable",
   computed: {
      tdItem() {
         return (item, head) => {
            return item[head.value] || "";
         };
      },
   },
   methods: {
      actionFnCallback(item) {
         this.actionFn.call(this, item);
      },
   },
   props: {
      items: {
         type: Array,
         required: true,
      },
      header: {
         type: Array,
         required: true,
      },
      "append-action": {
         type: Boolean,
         default: false,
      },
      "action-icon": {
         type: [String, Boolean],
         default: false,
      },
      "action-fn": {
         type: Function,
         default: () => {},
      },
   },
};
</script>
