<template>
  <q-layout view="hHh lpR fFf">
    <div class="row justify-center q-py-sm">
      <a href="https://y-knot.io/">
        <img src="~/assets/yknot_bcs_logo.png" />
      </a>
    </div>
    <q-page-container class="row justify-center">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
};
</script>

<style lang="scss" scoped>
.q-page-container {
  background: $secondary;
}
img {
  width: 20rem;
}
</style>
