<template>
  <v-dialog v-model="dialogAppInfo" max-width="500px">
    <v-card>
      <v-card-title class="headline dialogHeader">
        <span class="headline" v-if="data.name">Edit App: {{ data.name }}</span>
        <span class="headline" v-else>Add App</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field label="Name" :value="data.name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-combobox
                :items="comboboxItems"
                label="Type"
              ></v-combobox>
            </v-col>
            <v-col cols="12" sm="12">
              <v-combobox
                :items="comboboxItems"
                label="Platform"
              ></v-combobox>
            </v-col>
            <v-col cols="12" sm="12">
              <v-combobox
                :items="comboboxItems"
                label="Enviroment"
              ></v-combobox>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field label="URL"></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field label="Azure App Service Name"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="dialogBut1" text @click="dialogAppInfo = false">Cancel</v-btn>
        <v-btn color="dialogBut2" @click="dialogAppInfo = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "AddEditDialog",
    props: ['data'],
    data: () => ({
      dialogAppInfo: false,

      comboboxItems: [
        'Combobox 1',
        'Combobox 2',
        'Combobox 3',
        'Combobox 4',
      ],
    }),
    created () {
      this.$eventHub.$on('show-add-dialog-app', this.showEmptyDataDialog );
      this.$eventHub.$on('show-add-edit-dialog', this.showDialog );
    },
    methods: {
      showDialog() {
        this.dialogAppInfo = true
      },
      showEmptyDataDialog () {
        this.data = {}
        this.dialogAppInfo = true
      }
    }
  }
</script>

<style scoped>

</style>
