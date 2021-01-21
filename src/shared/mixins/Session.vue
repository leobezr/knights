<script>
import Session from "@/session/localSession.js";
import { mapActions } from "vuex";

export default {
   methods: {
      ...mapActions(["me"]),

      verifySession() {
         return Session.fetchSession();
      },
      validateProfile() {
         const HAS_SESSION = this.verifySession();

         if (HAS_SESSION) {
            this.me()
               .then(() => this.validatePage())
               .catch((e) => {
                  Session.clear();
                  this.$router.push({ name: "KnightBuilder" }).catch((e) => {});
               });
         } else {
            this.$router.push({ name: "KnightBuilder" }).catch((e) => {});
         }
      },
      validatePage() {
         const ROUTE = this.$route;

         if (ROUTE.meta.child) {
            return;
         } else {
            this.$router.push({ name: "Character" }).catch((e) => {});
         }
      },
   },
   created() {
      this.validateProfile();
   },
};
</script>
