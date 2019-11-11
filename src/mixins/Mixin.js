export const Mixin = {
  data: () => ({
    // currentEntity: true
  }),
  created: function() {
    this.initialize()
    this.getOptionsForCurrentPage()
  },
  methods: {
    getOptionsForCurrentPage () {
      const entity = this.currentData.dialogData.entity;
      this.axios.get('http://dev.itirra.com/luceo/admin/getCurrent' + entity + 'sPage.php')
        .then((response) => {
          this.$store.commit('setCurrentPageRelations', response.data.relations)
          this.$store.commit('setCurrentPageFilters', response.data.filters)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    },

    showDialogAndTransferEvent (item, event, routeName, action) {
      const entity = this.currentData.dialogData.entity;
      if (action == 'add-edit') {
        this.getAddEditData(entity)
      }
      item.routeName = routeName;
      this.currentData.itemData = item;
      this.$eventHub.$emit(event);
    },

    getAddEditData (entity) {
      this.axios.get('http://dev.itirra.com/luceo/admin/get' + entity + '.php')
        .then((response) => {

          this.currentData.dialogData.fields.forEach(function(field) {
            for (let [key, value] of Object.entries(response.data)) {
              if (field.key == key) {
                field.value = value
              }
            }
          });

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    },
  },
}
