<template>
  <v-dialog v-model="dialogTeamsRolesGroups" max-width="500px" dark>
    <v-card>
      <v-card-title class="headline dialogHeader">
        <span class="headline">Edit Team / Role / Groups</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <b>{{ data.name }}</b>
            </v-col>
            <v-col cols="12" sm="12">
              <v-switch
                label="Team One"
                v-model="teamsRolesGroupsSwitch"
                color="selectedColors"
              ></v-switch>
            </v-col>
            <v-col cols="12" sm="12">
              <v-select
                :items="teamsRolesGroupsRoles"
                :value="data.type"
                label="Role"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12">
              <v-select
                v-model="teamsRolesGroupsValue"
                :items="teamsRolesGroupsItems"
                attach
                chips
                label="Groups"
                multiple
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="dialogBut1" text @click="dialogTeamsRolesGroups = false">Cancel</v-btn>
        <v-btn color="dialogBut2" @click="dialogTeamsRolesGroups = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "TeamsRolesGroupsDialog",
    props: ['data'],
    data: () => ({
      dialogTeamsRolesGroups: false,

      teamsRolesGroupsSwitch: true,
      teamsRolesGroupsItems: ['foo', 'bar', 'fizz', 'buzz'],
      teamsRolesGroupsValue: ['foo', 'bar', 'fizz', 'buzz'],
      teamsRolesGroupsRoles: ['Coach', 'Player', 'Manager'],
    }),
    created () {
      this.$eventHub.$on('show-teams-roles-groups-dialog', this.showDialog );
    },
    methods: {
      showDialog() {
        this.dialogTeamsRolesGroups = true
      }
    }
  }
</script>

<style scoped>

</style>
