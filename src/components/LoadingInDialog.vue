<template>
  <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;" class="pa-5 dialogHeader">
    <v-progress-linear
      indeterminate
      color="white"
      class="mb-0"
    ></v-progress-linear>
  </div>
</template>

<script>
  export default {
    name: "LoadingInDialog",
  }
</script>

<style scoped>
</style>
