<template>
  <q-layout view="hHh lpR fFf">
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
</style>
