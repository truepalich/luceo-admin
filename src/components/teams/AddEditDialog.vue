<template>
  <v-dialog v-model="dialogTeamInfo" max-width="500px">
    <v-card>
      <v-card-title class="headline dialogHeader">
        <span class="headline" v-if="data.name">Edit Team: {{ data.name }}</span>
        <span class="headline" v-else>Add Team</span>
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
            <v-col cols="12" sm="12">
              <v-combobox
                :items="comboboxItems"
                label="Team Profile"
              ></v-combobox>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="dialogBut1" text @click="dialogTeamInfo = false">Cancel</v-btn>
        <v-btn color="dialogBut2" @click="dialogTeamInfo = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "AddEditDialog",
    props: ['data'],
    data: () => ({
      dialogTeamInfo: false,
      comboboxItems: [
        'Programming',
        'Design',
        'Vue',
        'Vuetify',
      ],
    }),
    created () {
      this.$eventHub.$on('show-add-dialog-team', this.showEmptyDataDialog );
      this.$eventHub.$on('show-add-edit-dialog', this.showDialog );
    },
    methods: {
      showDialog() {
        this.dialogTeamInfo = true
      },
      showEmptyDataDialog () {
        this.data = {}
        this.dialogTeamInfo = true
      }
    }
  }
</script>

<style scoped>

</style>
