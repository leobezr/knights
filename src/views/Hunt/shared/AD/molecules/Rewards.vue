<template>
   <div id="reward">
      <CardBody modal title="Rewards" v-if="hasRewardList">
         <template v-slot:content>
            <ul>
               <li v-for="(item, index) in rewardList.items" :key="index">
                  <ItemSprite :sprite="item" />
               </li>
            </ul>
            <div class="controller">
               <GoldPlaceholder :custom-value="rewardList.gold" />
               <v-btn color="primary" @click="getRewardChest" :loading="rewardLoadingStatus"
                  >Get reward</v-btn
               >
            </div>
         </template>
      </CardBody>
   </div>
</template>

<script>
import ItemSprite from "@/shared/components/AD/atoms/ItemSprite.vue";
import CardBody from "@/shared/components/AD/atoms/CardBody.vue";
import GoldPlaceholder from "@/views/Character/shared/AD/atoms/GoldPlaceholder.vue";
import { mapActions, mapGetters } from "vuex";

export default {
   name: "Reward",
   data() {
      return {
         rewardLoadingStatus: false,
         rewardList: {},
      };
   },
   components: {
      CardBody,
      ItemSprite,
      GoldPlaceholder,
   },
   computed: {
      ...mapGetters(["persona"]),

      hasRewardList() {
         return this.rewardList.lootbag || this.rewardList.gold > 0;
      },
   },
   methods: {
      ...mapActions(["getStoredReward"]),

      getRewardChest() {
         this.rewardLoadingStatus = true;

         this.getStoredReward()
            .catch((err) => {
               throw Error(err);
            })
            .finally(() => (this.rewardLoadingStatus = false));
      },
   },
   watch: {
      persona: {
         handler() {
            this.rewardList = this.persona.reward;
         },
      },
   },
};
</script>
