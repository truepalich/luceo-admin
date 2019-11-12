export const PreloaderInDialog = {
  data: () => ({
    loading: false,
    dialogContent: false
  }),
  created: function() {
    this.$eventHub.$on('before-request', this.beforeRequest);
    this.$eventHub.$on('after-response', this.afterResponse);
  },
  beforeDestroy: function () {
    this.$eventHub.$on('before-request', this.beforeRequest);
    this.$eventHub.$on('after-response', this.afterResponse);
  },
  methods: {
    beforeRequest: function () {
      this.loading = true;
      this.dialogContent = false;
    },
    afterResponse: function () {
      this.loading = false;
      this.dialogContent = true;
    }
  },
}
