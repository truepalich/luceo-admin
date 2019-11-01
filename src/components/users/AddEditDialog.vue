<template>
  <v-dialog v-model="dialogUser" max-width="500px">
    <v-card>
      <v-card-title class="headline dialogHeader">
        <span class="headline" v-if="data.firstName">Edit User: {{ data.firstName }} {{ data.lastName }}</span>
        <span class="headline" v-else>Add User</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field label="Email"></v-text-field>
            </v-col>
            <v-col cols="12" sm="8">
              If a user with this email already exists - prepopulate the form below + allow edit
            </v-col>
            <v-col cols="12" sm="4">
              <v-btn block color="dialogBut3">Check</v-btn>
            </v-col>
            <v-col cols="12" sm="12">
              <v-select
                v-model="teamsRolesGroupsValue"
                :items="teamsRolesGroupsItems"
                attach
                chips
                label="Customers"
                multiple
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="First name" :value="data.firstName"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Last name" :value="data.lastName"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Mob.Phone"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Alt.Email"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="HubSpot Cont. Id"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="playerProfiles"
                label="Player Profile"
              ></v-select>
            </v-col>

          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="dialogBut1" text @click="dialogUser = false">Cancel</v-btn>
        <v-btn color="dialogBut2" @click="dialogUser = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "AddEditDialog",
    props: ['data'],
    data: () => ({
      dialogUser: false,

      teamsRolesGroupsValue: ['foo', 'bar', 'fizz', 'buzz'],
      teamsRolesGroupsItems: ['foo', 'bar', 'fizz', 'buzz'],
      playerProfiles: ['Profile 1', 'Profile 2']
    }),
    created () {
      this.$eventHub.$on('show-add-dialog-user', this.showEmptyDataDialog );
      this.$eventHub.$on('show-add-edit-dialog', this.showDialog );
    },
    methods: {
      showDialog() {
        this.dialogUser = true
      },
      showEmptyDataDialog () {
        this.data = {}
        this.teamsRolesGroupsValue = []
        this.dialogUser = true
      }
    }
  }
</script>

<style scoped>

</style>
