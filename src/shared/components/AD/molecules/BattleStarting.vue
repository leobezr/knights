<template>
   <div id="partyInvite" v-if="modalViewState">
      <CardBody custom-title modal>
         <template v-slot:custom-title>
            <h3>Battle starting</h3>
         </template>
         <template v-slot:content>
            <div class="partyInviteContent">
               <div class="msg">
                  <p>
                     Party member
                     <strong>{{ requester }} </strong>
                     has started a battle. You will be redirected to it.
                  </p>

                  <div class="center">
                     <v-progress-circular indeterminate color="primary" />
                  </div>
               </div>
            </div>
         </template>
      </CardBody>
   </div>
</template>

<script>
import CardBody from "@/shared/components/AD/atoms/CardBody.vue";
import { mapActions } from "vuex";

export default {
   name: "BattleStarting",
   data() {
      return {
         modalViewState: false,
         requester: null,
      };
   },
   components: {
      CardBody,
   },
   methods: {
      ...mapActions(["joinParty"]),

      closeModal() {
         this.modalViewState = false;
      },
      battleIsStarting(player) {
         if (this.$route.name == "HuntingGround") return;

         this.modalViewState = true;
         this.requester = player;
      },
   },
   sockets: {
      battleGenerated(requester) {
         this.battleIsStarting(requester);
      },
      sendPartyMembers(route) {
         this.$router.push(route).catch((e) => {});
      },
   },
   watch: {
      $route: {
         handler(newRoute) {
            if (newRoute.name == "HuntingGround") {
               this.closeModal();
            }
         },
      },
   },
};
</script>
