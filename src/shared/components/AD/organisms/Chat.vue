<template>
   <div id="socketChat">
      <div class="chatContent">
         <span v-for="(response, index) in chatMsg" :key="index">
            <span :class="userMessage(response)" v-if="!response.system">
               <span class="userName"
                  >{{ DH.getTime(response.date) }} {{ response.nickname }} [
                  {{ response.level }} ]: </span
               >{{ response.msg }}
            </span>
            <span v-else class="system">
               {{ systemResponse(response).nickname }} has
               {{ systemResponse(response).msg }}
            </span>
         </span>
      </div>
      <div class="chatController">
         <v-form ref="SocketChat" @keypress.enter.native="dispatchSocket">
            <v-text-field
               v-model="msg"
               outlined
               dark
               dense
               hide-details
               color="primary"
               placeholder="Start chatting."
            />
         </v-form>
      </div>
   </div>
</template>

<script>
import "@/shared/scss/_chat.scss";
import DateHelper from "@/shared/utils/dateHelper.js";
import { mapState } from "vuex";

export default {
   name: "Chat",
   data() {
      return {
         chatMsg: [],
         msg: "",
         DH: DateHelper,
      };
   },
   computed: {
      ...mapState({
         persona: (store) => store.Knights.persona,
      }),

      userMessage() {
         return (socketData) => {
            if (!socketData) return "";

            if (socketData.id == this.persona._id) {
               return "self";
            } else {
               return "other";
            }
         };
      },
      systemResponse() {
         return (socketData) => {
            const nickname = socketData.nickname;
            var msg = "";

            if (socketData.system == "connect") {
               msg = "connected.";
            } else {
               msg = "left.";
            }

            return {
               nickname,
               msg,
            };
         };
      },
   },
   sockets: {
      chatDispatch(data) {
         this.chatMsg.push(data);
         this.scrollChatDown();
      },
   },
   methods: {
      scrollChatDown() {
         const $chat = document.querySelector(".chatContent");

         setTimeout(() => $chat.scroll(0, $chat.scrollHeight), 10);
      },
      dispatchSocket() {
         const CHAT = this.$refs.SocketChat;

         this.$socket.emit("chatDispatch", {
            id: this.persona._id,
            nickname: this.persona.nickname,
            date: Date.now(),
            level: this.persona.level,
            msg: this.msg,
         });

         CHAT.reset();
      },
      joinChatRoom() {
         this.$socket.emit("joinRoom", {
            userId: this.persona.id,
            nickname: this.persona.nickname,
         });
      },
   },
   created() {
      this.joinChatRoom();
   },
};
</script>
