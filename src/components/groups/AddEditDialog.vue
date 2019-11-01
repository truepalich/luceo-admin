<template>
  <v-dialog v-model="dialogGroupsInfo" max-width="500px">
    <v-card>
      <v-card-title class="headline dialogHeader">
        <span class="headline" v-if="data.name">Edit Group: {{ data.name }}</span>
        <span class="headline" v-else>Add Group</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <v-combobox
                :items="comboboxItems"
                label="Customer"
              ></v-combobox>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field label="Name" :value="data.name"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="dialogBut1" text @click="dialogGroupsInfo = false">Cancel</v-btn>
        <v-btn color="dialogBut2" @click="dialogGroupsInfo = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "AddEditDialog",
    props: ['data'],
    data: () => ({
      dialogGroupsInfo: false,

      comboboxItems: [
        'Customer 1',
        'Customer 2',
        'Customer 3',
        'Customer 4',
        'Customer 5',
      ],

    }),
    created () {
      this.$eventHub.$on('show-add-dialog-group', this.showEmptyDataDialog );
      this.$eventHub.$on('show-add-edit-dialog', this.showDialog );
    },
    methods: {
      showDialog() {
        this.dialogGroupsInfo = true
      },
      showEmptyDataDialog () {
        this.data = {}
        this.dialogGroupsInfo = true
      }
    }
  }
</script>

<style scoped>

</style>
