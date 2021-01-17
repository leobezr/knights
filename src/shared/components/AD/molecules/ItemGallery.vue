<template>
  <div id="itemGallery">
    <div class="loadingItems" v-if="fetchingItemList">
      <v-progress-circular indeterminate color="primary" />
    </div>
    <div class="itemList" v-else>
      <GearSprite
        v-for="(item, index) in gallery"
        :key="index"
        :sprite-list="item"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import GearSprite from "@/shared/components/AD/molecules/GearSprite.vue";
import "@/shared/scss/_itemGallery.scss";

export default {
  name: "ItemGallery",
  data() {
    return {
      fetchingItemList: false,
    };
  },
  components: {
    GearSprite,
  },
  computed: {
    ...mapState({
      itemGallery: (state) => state.Items.gallery,
    }),

    gallery() {
      return this.itemGallery ?? [];
    },
  },
  methods: {
    ...mapActions(["getItemsGallery"]),

    fetchItems() {
      this.fetchingItemList = true;

      this.getItemsGallery()
        .finally(() => (this.fetchingItemList = false))
        .catch((err) => {
          throw err;
        });
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>