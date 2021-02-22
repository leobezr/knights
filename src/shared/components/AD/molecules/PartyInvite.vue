<template>
   <div id="partyInvite" v-if="modalViewState">
      <CardBody custom-title modal>
         <template v-slot:custom-title>
            <h3>Party Invitation</h3>
         </template>
         <template v-slot:content>
            <div class="partyInviteContent">
               <div class="msg">
                  The player
                  <strong
                     >{{ inviter.nickname }} Lv. {{ inviter.level }}
                  </strong>
                  is inviting you to his party.
               </div>

               <div class="controller">
                  <v-btn color="error" text @click="closeModal">Decline</v-btn>
                  <v-btn color="primary" @click="acceptParty">Accept</v-btn>
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
   name: "PartyInvite",
   data() {
      return {
         modalViewState: false,
         inviter: null,
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
      invited(player) {
         if (this.$route.name == "Hunts") return;

         this.modalViewState = true;
         this.inviter = player;
      },
      async acceptParty() {
         await this.joinParty(this.inviter.battleSession.party);
         this.refreshMembers();
         this.closeModal();

         this.$router.push({ name: "Hunts" }).catch((e) => {});
      },
   },
   props: {
      "refresh-members": {
         type: Function,
         required: true,
      },
   },
};
</script>
