<template>
  <div v-show="loading" class="custom-loader">
    <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
      <v-progress-circular
        :size="80"
        color="deep-orange lighten-2"
        indeterminate
        class="mt-5"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Preloader',
    data () {
      return {
        loading: false
      }
    },
    created: function () {
      this.$eventHub.$on('before-request', this.beforeRequest);
      this.$eventHub.$on('after-response', this.afterResponse);
    },
    beforeDestroy: function () {
      this.$eventHub.$on('before-request', this.beforeRequest);
      this.$eventHub.$on('after-response', this.afterResponse);
    },
    methods: {
      beforeRequest: function () {
        this.loading = true
      },
      afterResponse: function () {
        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .custom-loader {
    width: 100%;
    min-height: 100%;
    background-color: #303030;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 201;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
