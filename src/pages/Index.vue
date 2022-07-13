<template>
  <q-page class="column justify-start items-center q-px-sm q-pt-xl">
    <div class="text-h4 text-weight-thin">VOTE FOR YKNOT</div>
    <div class="subtitle text-center q-my-md">
      Yknot votes for fair governance. If you appreciate our products and the services
      we offer to Telos, please vote for our blockproducer.
    </div>
    <div class="row justify-center full-width q-mb-md">
      <div class="subtitle-underline"></div>
    </div>
    <div class="row justify-center full-width">
      <vote-card />
    </div>
  </q-page>
</template>

<script>
import voteCard from "src/components/VoteCard.vue";
export default {
  name: "Index",
  components: {
    voteCard,
  },
};
</script>

<style lang="scss" scoped>
// .vote-section {
//   width: 100%;
//   background: $;
// }
.q-page {
  flex-basis: 500px;
  flex-grow: 0;
}
.subtitle-underline {
  width: 15rem;
  height: 1px;
  background: $accent;
}
.subtitle {
  font-family: judson-italic;
  line-height: 1rem;
  color: $accent;
}
</style>
