<template>
   <div id="partyMembers">
      <div class="partyBalloonHeader">
         Party Members ( {{ playersInParty }} )
      </div>
      <div class="partyBallonMembers">
         <v-form @keypress.enter.native="invitePlayer" ref="PlayerInvite">
            <v-text-field
               v-model="invitePlayerName"
               placeholder="Invite Member"
               dark
               color="primary"
               :rules="invitePlayerRule"
               outlined
               dense
               hide-details
               class="mb-3"
               append-icon="mdi-account-multiple-plus-outline"
            />
         </v-form>
         <ul>
            <li
               v-for="(member, index) in membersInParty"
               :key="index"
               :online="member.online"
            >
               <span>
                  {{ member.nickname }} <strong class="level">[<span>{{ member.level }}</span>]</strong>
                  <v-icon color="amber accent-4" v-if="member.leader" small
                     >mdi-crown-outline</v-icon
                  >
               </span>
               <span
                  v-if="
                     (!member.leader && leaderPermission) ||
                     (member.identifier == persona.characterId &&
                        !member.leader)
                  "
               >
                  <v-btn
                     icon
                     color="error"
                     @click="() => kickPlayerFromParty(member)"
                     small
                  >
                     <v-icon>mdi-window-close</v-icon>
                  </v-btn>
               </span>
            </li>
         </ul>
      </div>
      <BattleStarting />
      <PartyInvite ref="PartyInvite" :refresh-members="refreshMembers"/>
   </div>
</template>

<script>
import "@/shared/scss/_partyMembers.scss";
import PartyInvite from "@/shared/components/AD/molecules/PartyInvite.vue";
import BattleStarting from "@/shared/components/AD/molecules/BattleStarting.vue";
import { mapActions, mapState } from "vuex";

export default {
   name: "PartyMembers",
   data() {
      return {
         membersInParty: [],
         invitePlayerName: "",
      };
   },
   components: {
      PartyInvite,
      BattleStarting
   },
   computed: {
      ...mapState({
         persona: (store) => store.Knights.persona,
      }),

      playersInParty() {
         if (Array.isArray(this.membersInParty)) {
            return this.membersInParty.length;
         }
         return 0;
      },
      leaderPermission() {
         let leaderIndex = this.membersInParty.findIndex(
            (member) => member.leader
         );
         if (leaderIndex != -1) {
            const leaderId = this.membersInParty[leaderIndex].identifier;
            return leaderId == this.persona.characterId;
         }
         return false;
      },
      invitePlayerRule() {
         return [
            (v) => v != this.persona?.nickname,
            (v) => {
               if (!v?.length) return true;
               return v?.length >= 4;
            },
         ];
      },
   },
   methods: {
      ...mapActions(["me", "createParty", "removeParty"]),

      async init() {
         await this.fetchData();

         this.joinParty();
      },
      async fetchData() {
         await this.me();
         await this.createParty();
      },
      async joinParty() {
         await this.me();

         this.$socket.emit("joinParty", this.persona);
      },
      async kickPlayerFromParty(member) {
         await this.removeParty(member.identifier);
         this.refreshMembers();
      },
      async refreshMembers() {
         await this.init();

         this.$socket.emit("partyMembers", this.persona);
      },
      invitePlayer() {
         const validPlayerName = this.$refs.PlayerInvite.validate();
         const hasPlayerName = this.invitePlayerName.length >= 4;

         if (validPlayerName && hasPlayerName) {
            this.$socket.emit("partyInvite", {
               invited: this.invitePlayerName,
               inviter: this.persona,
            });

            this.$refs.PlayerInvite.reset();
         }
      },
   },
   sockets: {
      async partyRemoved(member) {
         if (member.userRemoved.identifier == this.persona.characterId) {
            await this.$socket.emit("partyRemoved", {
               member,
               persona: this.persona,
            });
         }
         this.init();
      },
      partyInvite(data) {
         this.$refs.PartyInvite.invited(data);
      },
      partyMembers(data) {
         this.membersInParty = data ? data.members : [];
      },
      partyUpdated() {
         this.init();
      },
   },
   watch: {
      $route: {
         handler() {
            this.init();
         },
      },
      membersInParty: {
         async handler(v) {
            if (v && !v.length) {
               await this.init();
            }
         },
      },
   },
   created() {
      this.init();
   },
};
</script>
