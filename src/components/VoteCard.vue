<template>
  <q-card class="vote-card bg-secondary" flat :bordered="isAuthenticated">
    <q-card-section class="row items-center justify-center">
      <login-button class="" />
    </q-card-section>
    <q-separator v-if="isAuthenticated" />
    <q-card-section v-if="isAuthenticated">
      <div class="" v-if="!userHasVoted">
        <div class="fit column wrap content-center">
          <div class="text-center q-mb-sm">
            Do you mind voting for our Telos blockproducer?
          </div>
          <div class="q-mt-xs q-mb-xs text-center">
            <q-btn
              size="md"
              no-caps
              class="bg-accent text-secondary"
              label="VOTE"
              @click="vote()"
              flat
            />
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        Looks like you already voted for our blockproducer. <br />
        Thank you for your support.
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { openURL } from "quasar";
import LoginButton from "src/components/LoginButton.vue";

export default {
  // name: 'ComponentName',
  components: {
    LoginButton,
  },
  data() {
    return {
      userHasVoted: false,
      userVoteInfo: [],
      bpList: ["bp.yknot"],
    };
  },
  computed: {
    ...mapGetters("account", ["isAuthenticated", "accountName"]),
  },
  methods: {
    async checkIfUserHasVoted() {
      const tableResults = await this.$store.$api.getTableRows({
        code: "eosio",
        scope: "eosio",
        table: "voters",
        lower_bound: this.accountName,
        upper_bound: this.accountName,
        limit: 1,
        reverse: false,
        show_payer: false,
      });
      this.userVoteInfo = tableResults.rows[0];
      if (!this.userVoteInfo)
      {
        return;
      }
      else{
        let producers = this.userVoteInfo.producers;
      }
      if (
        this.bpList.every((v) => producers.includes(v)) ||
        localStorage.getItem("dontShowVote")
      ) {
        this.userHasVoted = true;
      } else {
        this.userHasVoted = false;
      }
    },
    async vote() {
      let newBpList = [];
      // Check if current block producers are still valid
      // Check if limit has been reached, if not, append to list and vote
      if (this.userVoteInfo.producers.length >= 30) {
        this.$q.notify({
          color: "red-4",
          message: "You can only vote for 30 BP",
          timeout: 5000,
          actions: [
            {
              label: "Change on Explorer",
              color: "white",
              handler: () => {
                openURL(
                  `https://eosauthority.com/vote/producers?network=${
                    process.env.TESTNET == "true" ? "telostest" : "telos"
                  }`
                );
              },
            },
          ],
        });
        return;
      } else {
        newBpList = [
          ...new Set([...this.userVoteInfo.producers, ...this.bpList]),
        ].sort();
      }

      try {
        const actions = [
          {
            account: "eosio",
            name: "voteproducer",
            data: {
              producers: newBpList,
              proxy: "",
              voter: this.accountName,
            },
          },
        ];

        let transaction = await this.$store.$api.signTransaction(actions);
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          message: "Thank you for supporting us!",
        });
      } catch (error) {
        this.$q.notify({
          color: "red-4",
          message: error,
          timeout: 5000,
          actions: [
            {
              label: "Change on Explorer",
              color: "white",
              handler: () => {
                openURL(
                  `https://eosauthority.com/vote/producers?network=${
                    process.env.TESTNET == "true" ? "telostest" : "telos"
                  }`
                );
              },
            },
          ],
        });
      }
      this.userHasVoted = true;
    },
  },

  async mounted() {
    // Check if user has voted for us
    if (this.isAuthenticated) {
      this.checkIfUserHasVoted();
    }
  },
  watch: {
    isAuthenticated(newVal) {
      if (newVal) {
        this.checkIfUserHasVoted();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.vote-card {
  flex-basis: 400px;
  flex-grow: 0;
  flex-shrink: 1;
}
</style>
