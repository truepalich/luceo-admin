<template>
  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Users</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <div class="flex-grow-1"></div>



        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.name" label="Full name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.teamsRolesGroups" label="Teams & Roles & Groups"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.appsPermissions" label="Apps & Permissions"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.accountStatus" label="Account Status"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.activity" label="Activity (2 weeks)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.playerProfile" label="Player Profile"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.customers" label="Customers"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>



      </v-toolbar>
    </template>

    <template v-slot:item.headshot="{ item }">
      <v-avatar v-if="item.headshot">
        <img :src="item.headshot" alt="avatar">
      </v-avatar>
      <v-avatar v-else color="indigo">
        <v-icon dark>mdi-account-circle</v-icon>
      </v-avatar>
    </template>

    <template v-slot:item.name="{ item }">
      <a>{{ item.name }}</a>
    </template>

    <template v-slot:item.teamsRolesGroups="{ item }">
      <a v-html="item.teamsRolesGroups"></a>
    </template>

    <template v-slot:item.appsPermissions="{ item }">
      <a>{{ item.appsPermissions }}</a>
    </template>

    <template v-slot:item.accountStatus="{ item }">
      <v-chip :color="item.accountStatus=='Active' ? 'green' : 'blue'" dark>{{ item.accountStatus }}</v-chip>
    </template>

    <template v-slot:item.activity="{ item }">
      <a v-html="item.activity"></a>
    </template>

    <template v-slot:item.playerProfile="{ item }">
      <a>{{ item.playerProfile }}</a>
    </template>

    <template v-slot:item.customers="{ item }">
      <a>{{ item.customers }}</a>
    </template>


    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
    export default {
        name: "Users",
        data: () => ({
          dialog: false,
          headers: [
            { text: 'Headshot', value: 'headshot', sortable: false },
            {
              text: 'Full Name',
              align: 'left',
              value: 'name',
            },
            { text: 'Teams & Roles & Groups', value: 'teamsRolesGroups' },
            { text: 'Apps & Permissions', value: 'appsPermissions' },
            { text: 'Account status', value: 'accountStatus' },
            { text: 'Activity (2 weeks)', value: 'activity' },
            { text: 'Player Profile', value: 'playerProfile', },
            { text: 'Customers', value: 'customers', },
            { text: 'Actions', value: 'action', sortable: false },
          ],
          users: [],
          editedIndex: -1,
          editedItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
          },
          defaultItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
          },
        }),

        computed: {
          formTitle () {
            return this.editedIndex === -1 ? 'New User' : 'Edit User'
          },
        },

        watch: {
          dialog (val) {
            val || this.close()
          },
        },

        created () {
          this.initialize()
        },

        methods: {
          initialize () {
            this.users = [
              {
                id: 1,
                headshot: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                name: 'Jason Oner',
                teamsRolesGroups: 'Team One / Coach<br/>' +
                                  '[Team Two / Player]<br/>' +
                                  '[Team Three / Player]',
                appsPermissions: 'Team One: Assist, Session Tracker, Whiteboard',
                accountStatus: 'Active',
                activity: 'Session Tr.(32): 08/15/19 hh:mm:ss pm<br/>' +
                          'Assist (32): 08/15/19 hh:mm:ss pm<br/>' +
                          'more...',
                playerProfile: 'Fernando Torres',
                customers: 'Customer 1, Customer 2'
              },
              {
                id: 2,
                headshot: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                name: 'Travis Howard',
                teamsRolesGroups: 'Team One / Coach<br/>' +
                '[Team Three / Player]',
                appsPermissions: 'Whiteboard',
                accountStatus: 'Invited',
                activity: 'Session Tr.(32): 08/15/19 hh:mm:ss pm',
                playerProfile: 'Alex Morozenko',
                customers: 'Customer 4'
              },

            ]
          },

          editItem (item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
          },

          deleteItem (item) {
            const index = this.users.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.users.splice(index, 1)
          },

          close () {
            this.dialog = false
            setTimeout(() => {
              this.editedItem = Object.assign({}, this.defaultItem)
              this.editedIndex = -1
            }, 300)
          },

          save () {
            if (this.editedIndex > -1) {
              Object.assign(this.users[this.editedIndex], this.editedItem)
            } else {
              this.users.push(this.editedItem)
            }
            this.close()
          },
        },
    }
</script>

<style scoped>

</style>
