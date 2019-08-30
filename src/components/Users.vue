<template>
  <div>

    <v-card color="white" class="mb-4 filter-custom-box">
      <v-card-text class="pa-0">
        <v-row align="center">
          <v-col cols="12" md="3" class="py-0">
            <div class="pl-4">
              <div style="height: 48px;"><h1>Users</h1></div>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="12" md="2" class="py-0">
            <v-select
              :items="filterSearchItems"
              label="Team"
            ></v-select>
            <v-select
              :items="filterSearchItems"
              label="Status"
            ></v-select>
          </v-col>
          <v-col cols="12" md="2" class="py-0">
            <v-select
              :items="filterSearchItems"
              label="Customer"
            ></v-select>
            <v-select
              :items="filterSearchItems"
              label="Apps"
            ></v-select>
          </v-col>
          <v-col cols="12" md="2" class="py-0">
            <v-select
              :items="filterSearchItems"
              label="Group"
            ></v-select>
            <v-select
              :items="filterSearchItems"
              label="Role"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3" class="py-0 align-center justify-end d-flex">
            <div class="pr-2">
              <v-btn color="orange" @click="showAddUser" class="ma-2 white--text" fab><v-icon>mdi-plus</v-icon></v-btn>
              <v-btn color="blue-grey" class="ma-2 white--text" fab><v-icon>mdi-cloud-upload</v-icon></v-btn>
              <v-btn color="indigo" class="ma-2 white--text">Template</v-btn>
            </div>
          </v-col>
        </v-row>

      </v-card-text>
    </v-card>

    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
      show-select
    >
      <template v-slot:top>

          <!--dialogTeamsRolesGroups-->
          <v-dialog v-model="dialogTeamsRolesGroups" max-width="500px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span class="headline">Edit Team / Role / Groups</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <b>{{ dialogTeamsRolesGroupsData.userName }}</b>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-switch
                        :label="dialogTeamsRolesGroupsData.name"
                        v-model="teamsRolesGroupsSwitch"
                      ></v-switch>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-select
                        :items="teamsRolesGroupsRoles"
                        :value="dialogTeamsRolesGroupsData.type"
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
                <v-btn color="blue darken-1" text @click="dialogTeamsRolesGroups = false">Cancel</v-btn>
                <v-btn color="primary" @click="dialogTeamsRolesGroups = false">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--dialogTeamsRolesGroups-->



          <!--dialogAppsPermissions-->
          <v-dialog v-model="dialogAppsPermissions" max-width="1000px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span class="headline">Apps & Permissions</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <b>{{ dialogAppsPermissionsData.userName }} | Apps & Permissions</b>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <b>Team One (Coach)</b>
                    </v-col>

                    <v-col cols="12" sm="3" class="align-center d-flex">
                      Assist App Access:
                    </v-col>
                    <v-col cols="12" sm="1">
                      <v-switch
                        v-model="appsPermissionsSwitch1"
                      ></v-switch>
                    </v-col>
                    <v-col cols="12" sm="2"><v-checkbox label="Permission 1"></v-checkbox></v-col>
                    <v-col cols="12" sm="2"><v-checkbox label="Permission 2"></v-checkbox></v-col>
                    <v-col cols="12" sm="2"><v-checkbox label="Permission 3"></v-checkbox></v-col>
                    <v-col cols="12" sm="2"><v-checkbox label="Permission 4"></v-checkbox></v-col>


                    <v-col cols="12" sm="3" class="align-center d-flex">
                      Whiteboard App Access:
                    </v-col>
                    <v-col cols="12" sm="1">
                      <v-switch
                        v-model="appsPermissionsSwitch2"
                      ></v-switch>
                    </v-col>
                    <v-col cols="12" sm="2"><v-checkbox label="Permission 1"></v-checkbox></v-col>
                    <v-col cols="12" sm="2"><v-checkbox label="Permission 2"></v-checkbox></v-col>
                    <v-col cols="12" sm="2"><v-checkbox label="Permission 3"></v-checkbox></v-col>
                    <v-col cols="12" sm="2"><v-checkbox label="Permission 4"></v-checkbox></v-col>


                    <v-col cols="12" sm="3" class="align-center d-flex">
                      GamePlan App Access:
                    </v-col>
                    <v-col cols="12" sm="1">
                      <v-switch
                        v-model="appsPermissionsSwitch3"
                      ></v-switch>
                    </v-col>
                    <v-col cols="12" sm="2"><v-checkbox label="Permission 1"></v-checkbox></v-col>
                    <v-col cols="12" sm="2"><v-checkbox label="Permission 2"></v-checkbox></v-col>
                    <v-col cols="12" sm="2"><v-checkbox label="Permission 3"></v-checkbox></v-col>
                    <v-col cols="12" sm="2"><v-checkbox label="Permission 4"></v-checkbox></v-col>


                    <v-col cols="12" sm="3" class="align-center d-flex">
                      Usage Reports App Access:
                    </v-col>
                    <v-col cols="12" sm="1">
                      <v-switch
                        v-model="appsPermissionsSwitch4"
                      ></v-switch>
                    </v-col>
                    <v-col cols="12" sm="2"><v-checkbox label="Permission 1"></v-checkbox></v-col>
                    <v-col cols="12" sm="2"><v-checkbox label="Permission 2"></v-checkbox></v-col>
                    <v-col cols="12" sm="2"><v-checkbox label="Permission 3"></v-checkbox></v-col>
                    <v-col cols="12" sm="2"><v-checkbox label="Permission 4"></v-checkbox></v-col>


                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="dialogAppsPermissions = false">Cancel</v-btn>
                <v-btn color="primary" @click="dialogAppsPermissions = false">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--dialogAppsPermissions-->


          <!--dialogAccountStatus-->
          <v-dialog v-model="dialogAccountStatus" max-width="500px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span class="headline">Account Status</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <b>{{ dialogAccountStatusData.userName }} | Account Status</b>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <b>Current status: <v-chip :color="dialogAccountStatusData.activity=='Active' ? 'green' : 'indigo lighten-2'" dark>{{ dialogAccountStatusData.activity }}</v-chip></b>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <b>Current Login: test@luceosports.com</b>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-btn color="success">Reset Password</v-btn>
                      <v-btn color="error">Revoke Access</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="dialogAccountStatus = false">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--dialogAccountStatus-->


          <!--dialogActivity-->
          <v-dialog v-model="dialogActivity" max-width="500px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span class="headline">Activity (2 weeks)</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <b>{{ dialogActivityData.userName }} | 2 Week Activity</b>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        :items="activityApp"
                        value="Assist"
                        label="App"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" class="align-center d-flex justify-end">
                      <b>Total: 34</b>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-simple-table>
                        <thead>
                        <tr>
                          <th class="text-left">App</th>
                          <th class="text-left">Date/Time</th>
                          <th class="text-left">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in activityItems" :key="item.name">
                          <td>{{ item.app }}</td>
                          <td>{{ item.date}}</td>
                          <td>{{ item.status}}</td>
                        </tr>
                        </tbody>
                      </v-simple-table>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="dialogActivity = false">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--dialogActivity-->


          <!--dialogUser-->
          <v-dialog v-model="dialogUser" max-width="500px">
                <v-card>
                  <v-card-title class="headline grey lighten-2">
                    <span class="headline" v-if="dialogUserData.userName">Edit User: {{ dialogUserData.userName }}</span>
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
                          <v-btn block color="success">Check</v-btn>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-select
                            v-model="teamsRolesGroupsValue"
                            :items="dialogUserData.userName ? teamsRolesGroupsItems: ''"
                            attach
                            chips
                            label="Customers"
                            multiple
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field label="First name" :value="dialogUserData.firstName"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field label="Last name" :value="dialogUserData.lastName"></v-text-field>
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
                            :items="dialogUserData.playerProfile"
                            label="Player Profile"
                          ></v-select>
                        </v-col>

                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="dialogUser = false">Cancel</v-btn>
                    <v-btn color="primary" @click="dialogUser = false">Save</v-btn>
                  </v-card-actions>
            </v-card>
          </v-dialog>
          <!--dialogUser-->

          <!--dialogAvatar-->
          <v-dialog v-model="dialogAvatar" max-width="500px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span class="headline">Change user avatar</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <b>{{ dialogAvatarData.userName }}</b>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-file-input
                        label="Upload avatar"
                        prepend-icon="mdi-camera"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="dialogAvatar = false">Cancel</v-btn>
                <v-btn color="primary" @click="dialogAvatar = false">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--dialogAvatar-->


          <!--dialogPlayerProfile-->
          <v-dialog v-model="dialogPlayerProfile" max-width="500px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span class="headline">Player Profile</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      Cooming soon...
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="dialogPlayerProfile = false">Cancel</v-btn>
                <!--<v-btn color="primary" @click="dialogPlayerProfile = false">Save</v-btn>-->
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--dialogPlayerProfile-->


          <!--dialogCustomers-->
          <v-dialog v-model="dialogCustomers" max-width="500px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span class="headline">Customers</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      Cooming soon...
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="dialogCustomers = false">Cancel</v-btn>
                <!--<v-btn color="primary" @click="dialogPlayerProfile = false">Save</v-btn>-->
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--dialogCustomers-->
      </template>

      <template v-slot:item.headshot="{ item }">
        <v-avatar v-if="item.headshot" size="36px" @click="dialogAvatar = true && (dialogAvatarData.userName = item.name)" style="cursor: pointer">
          <img :src="item.headshot" alt="avatar">
        </v-avatar>
        <v-avatar v-else color="grey" size="36px" @click="dialogAvatar = true && (dialogAvatarData.userName = item.name)" style="cursor: pointer">
          <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>
        <v-icon color="primary" small @click="dialogAvatar = true && (dialogAvatarData.userName = item.name)">mdi-pencil</v-icon>
      </template>

      <template v-slot:item.name="{ item }">
        <a @click="dialogUser = true && (dialogUserData.userName = item.name, dialogUserData.firstName = item.firstName, dialogUserData.lastName = item.lastName)">{{ item.name }}</a>
      </template>

      <template v-slot:item.teamsRolesGroups="{ item }">
        <div v-for="trg in item.teamsRolesGroups">
          <a @click="dialogTeamsRolesGroups = true && (dialogTeamsRolesGroupsData.name = trg.name, dialogTeamsRolesGroupsData.type = trg.type, dialogTeamsRolesGroupsData.userName = item.name)">{{ trg.name }}/{{ trg.type }}</a>
        </div>
      </template>

      <template v-slot:item.appsPermissions="{ item }">
        <a @click="dialogAppsPermissions = true && (dialogAppsPermissionsData.userName = item.name)">{{ item.appsPermissions }}</a>
      </template>

      <template v-slot:item.accountStatus="{ item }">
        <v-chip @click="dialogAccountStatus = true && (dialogAccountStatusData.activity = item.accountStatus, dialogAccountStatusData.userName = item.name)" :color="item.accountStatus=='Active' ? 'green' : 'indigo lighten-2'" dark>{{ item.accountStatus }}</v-chip>
      </template>

      <template v-slot:item.activity="{ item }">
        <a @click="dialogActivity = true && (dialogActivityData.userName = item.name)" v-html="item.activity"></a>
      </template>

      <template v-slot:item.playerProfile="{ item }">
        <a @click="dialogPlayerProfile = true">{{ item.playerProfile }}</a>
      </template>

      <template v-slot:item.customers="{ item }">
        <a @click="dialogCustomers = true">{{ item.customers }}</a>
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
  </div>
</template>

<script>
    export default {
        name: "Users",
        data: () => ({
          search: '',
          filterSearchItems: ['Filter 1', 'Filter 2', 'Filter 3'],

          dialog: false,
          dialogTeamsRolesGroups: false,
          dialogAppsPermissions: false,
          dialogAccountStatus: false,
          dialogActivity: false,
          dialogUser: false,
          dialogAvatar: false,
          dialogPlayerProfile: false,
          dialogCustomers: false,

          dialogAccountStatusData: {
            userName: 'default',
            activity: 'default'
          },
          dialogTeamsRolesGroupsData: {
            userName: 'default',
            name: 'default',
            type: 'default',
          },
          dialogActivityData: {
            userName: 'default',
          },
          dialogAppsPermissionsData: {
            userName: 'default',
          },
          dialogUserData: {
            userName: '',
            firstName: '',
            lastName: '',
            playerProfile: ['Profile 1', 'Profile 2']
          },
          dialogAvatarData: {
            userName: 'default',
          },

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
            // { text: 'Actions', value: 'action', sortable: false },
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

          teamsRolesGroupsSwitch: true,
          teamsRolesGroupsItems: ['foo', 'bar', 'fizz', 'buzz'],
          teamsRolesGroupsValue: ['foo', 'bar', 'fizz', 'buzz'],
          teamsRolesGroupsRoles: ['Coach', 'Player', 'Manager'],

          appsPermissionsSwitch1: true,
          appsPermissionsSwitch2: true,
          appsPermissionsSwitch3: true,
          appsPermissionsSwitch4: true,

          activityItems: [
            { id: 1, app: 'Assist', date: '08/15/19 hh:mm:ss pm', status: 'Success' },
            { id: 2, app: 'Assist', date: '08/15/19 hh:mm:ss pm', status: 'Success' },
            { id: 3, app: 'Assist', date: '08/15/19 hh:mm:ss pm', status: 'Success' },
            { id: 4, app: 'Assist', date: '08/15/19 hh:mm:ss pm', status: 'Success' },
            { id: 5, app: 'Assist', date: '08/15/19 hh:mm:ss pm', status: 'Success' },
            { id: 6, app: 'Assist', date: '08/15/19 hh:mm:ss pm', status: 'Success' },
            { id: 7, app: 'Assist', date: '08/15/19 hh:mm:ss pm', status: 'Success' },
          ],

          activityApp: ['Assist', 'Assist 2', 'Assist 3'],
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

          showAddUser () {
            this.dialogUserData.userName = '',
            this.dialogUserData.firstName = '',
            this.dialogUserData.lastName = '',
            this.dialogUser = true
          },


          initialize () {
            this.users = [
              {
                id: 1,
                headshot: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                name: 'Jason Oner',
                firstName: 'Jason',
                lastName: 'Oner',
                teamsRolesGroups: [
                  { id: 1, name: 'Team One', type: 'Coach'},
                  { id: 2, name: 'Team Two', type: 'Player'},
                  { id: 3, name: 'Team Three', type: 'Player'},
                ],
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
                firstName: 'Travis',
                lastName: 'Howard',
                teamsRolesGroups: [
                  { id: 1, name: 'Team One', type: 'Player'},
                ],
                appsPermissions: 'Whiteboard',
                accountStatus: 'Invited',
                activity: 'Session Tr.(32): 08/15/19 hh:mm:ss pm',
                playerProfile: 'Alex Morozenko',
                customers: 'Customer 4'
              },
              {
                id: 3,
                headshot: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                name: 'Alli Connors',
                firstName: 'Alli',
                lastName: 'Connors',
                teamsRolesGroups: [
                  { id: 2, name: 'Team Two', type: 'Player'},
                ],
                appsPermissions: 'Team One: Session Tracker, Whiteboard',
                accountStatus: 'Invited',
                activity:
                'Assist (32): 08/15/19 hh:mm:ss pm<br/>' +
                'more...',
                playerProfile: 'Luca Modric',
                customers: 'Customer 5'
              },
              {
                id: 4,
                headshot: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                name: 'Cindy Baker',
                firstName: 'Cindy',
                lastName: 'Baker',
                teamsRolesGroups: [
                  { id: 1, name: 'Team Three', type: 'Player'},
                ],
                appsPermissions: 'Whiteboard',
                accountStatus: 'Invited',
                activity: 'Session Tr.(33): 08/15/19 hh:mm:ss pm',
                playerProfile: 'Marcus Scott',
                customers: 'Customer 10'
              },
              {
                id: 5,
                headshot: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                name: 'Alex Soborsky',
                firstName: 'Alex',
                lastName: 'Soborsky',
                teamsRolesGroups: [
                  { id: 1, name: 'Team One', type: 'Coach'},
                  { id: 2, name: 'Team Two', type: 'Player'},
                ],
                appsPermissions: 'Team One: Whiteboard',
                accountStatus: 'Active',
                activity: 'Session Tr.(32): 08/15/19 hh:mm:ss pm<br/>' +
                'Assist (32): 08/15/19 hh:mm:ss pm<br/>',
                playerProfile: 'Jimmy Dockers',
                customers: 'Customer 15, Customer 22'
              },
              {
                id: 6,
                headshot: '',
                name: 'Jason Oner',
                firstName: 'Jason',
                lastName: 'Oner',
                teamsRolesGroups: [
                  { id: 1, name: 'Team One', type: 'Coach'},
                  { id: 2, name: 'Team Two', type: 'Player'},
                  { id: 3, name: 'Team Three', type: 'Player'},
                ],
                appsPermissions: 'Team One: Assist, Session Tracker, Whiteboard',
                accountStatus: 'Active',
                activity: 'Session Tr.(32): 08/15/19 hh:mm:ss pm<br/>' +
                'Assist (32): 08/15/19 hh:mm:ss pm<br/>' +
                'more...',
                playerProfile: 'Fernando Torres',
                customers: 'Customer 1, Customer 2'
              },
              {
                id: 7,
                headshot: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                name: 'Travis Howard',
                firstName: 'Travis',
                lastName: 'Howard',
                teamsRolesGroups: [
                  { id: 1, name: 'Team One', type: 'Player'},
                ],
                appsPermissions: 'Whiteboard',
                accountStatus: 'Invited',
                activity: 'Session Tr.(32): 08/15/19 hh:mm:ss pm',
                playerProfile: 'Alex Morozenko',
                customers: 'Customer 4'
              },
              {
                id: 8,
                headshot: '',
                name: 'Alli Connors',
                firstName: 'Alli',
                lastName: 'Connors',
                teamsRolesGroups: [
                  { id: 2, name: 'Team Two', type: 'Player'},
                ],
                appsPermissions: 'Team One: Session Tracker, Whiteboard',
                accountStatus: 'Invited',
                activity:
                'Assist (32): 08/15/19 hh:mm:ss pm<br/>' +
                'more...',
                playerProfile: 'Luca Modric',
                customers: 'Customer 5'
              },
              {
                id: 9,
                headshot: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                name: 'Cindy Baker',
                firstName: 'Cindy',
                lastName: 'Baker',
                teamsRolesGroups: [
                  { id: 1, name: 'Team Three', type: 'Player'},
                ],
                appsPermissions: 'Whiteboard',
                accountStatus: 'Invited',
                activity: 'Session Tr.(33): 08/15/19 hh:mm:ss pm',
                playerProfile: 'Marcus Scott',
                customers: 'Customer 10'
              },
              {
                id: 10,
                headshot: '',
                name: 'Alex Soborsky',
                firstName: 'Alex',
                lastName: 'Soborsky',
                teamsRolesGroups: [
                  { id: 1, name: 'Team One', type: 'Coach'},
                  { id: 2, name: 'Team Two', type: 'Player'},
                ],
                appsPermissions: 'Team One: Whiteboard',
                accountStatus: 'Active',
                activity: 'Session Tr.(32): 08/15/19 hh:mm:ss pm<br/>' +
                'Assist (32): 08/15/19 hh:mm:ss pm<br/>',
                playerProfile: 'Jimmy Dockers',
                customers: 'Customer 15, Customer 22'
              },
              {
                id: 11,
                headshot: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                name: 'Jason Oner',
                firstName: 'Jason',
                lastName: 'Oner',
                teamsRolesGroups: [
                  { id: 1, name: 'Team One', type: 'Coach'},
                  { id: 2, name: 'Team Two', type: 'Player'},
                  { id: 3, name: 'Team Three', type: 'Player'},
                ],
                appsPermissions: 'Team One: Assist, Session Tracker, Whiteboard',
                accountStatus: 'Active',
                activity: 'Session Tr.(32): 08/15/19 hh:mm:ss pm<br/>' +
                'Assist (32): 08/15/19 hh:mm:ss pm<br/>' +
                'more...',
                playerProfile: 'Fernando Torres',
                customers: 'Customer 1, Customer 2'
              },
              {
                id: 12,
                headshot: '',
                name: 'Travis Howard',
                firstName: 'Travis',
                lastName: 'Howard',
                teamsRolesGroups: [
                  { id: 1, name: 'Team One', type: 'Player'},
                ],
                appsPermissions: 'Whiteboard',
                accountStatus: 'Invited',
                activity: 'Session Tr.(32): 08/15/19 hh:mm:ss pm',
                playerProfile: 'Alex Morozenko',
                customers: 'Customer 4'
              },
              {
                id: 13,
                headshot: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                name: 'Alli Connors',
                firstName: 'Alli',
                lastName: 'Connors',
                teamsRolesGroups: [
                  { id: 2, name: 'Team Two', type: 'Player'},
                ],
                appsPermissions: 'Team One: Session Tracker, Whiteboard',
                accountStatus: 'Invited',
                activity:
                'Assist (32): 08/15/19 hh:mm:ss pm<br/>' +
                'more...',
                playerProfile: 'Luca Modric',
                customers: 'Customer 5'
              },
              {
                id: 14,
                headshot: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                name: 'Cindy Baker',
                firstName: 'Cindy',
                lastName: 'Baker',
                teamsRolesGroups: [
                  { id: 1, name: 'Team Three', type: 'Player'},
                ],
                appsPermissions: 'Whiteboard',
                accountStatus: 'Invited',
                activity: 'Session Tr.(33): 08/15/19 hh:mm:ss pm',
                playerProfile: 'Marcus Scott',
                customers: 'Customer 10'
              },
              {
                id: 15,
                headshot: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                name: 'Alex Soborsky',
                firstName: 'Alex',
                lastName: 'Soborsky',
                teamsRolesGroups: [
                  { id: 1, name: 'Team One', type: 'Coach'},
                  { id: 2, name: 'Team Two', type: 'Player'},
                ],
                appsPermissions: 'Team One: Whiteboard',
                accountStatus: 'Active',
                activity: 'Session Tr.(32): 08/15/19 hh:mm:ss pm<br/>' +
                'Assist (32): 08/15/19 hh:mm:ss pm<br/>',
                playerProfile: 'Jimmy Dockers',
                customers: 'Customer 15, Customer 22'
              },
            ]
          },

          // editItem (item) {
          //   this.editedIndex = this.users.indexOf(item)
          //   this.editedItem = Object.assign({}, item)
          //   this.dialog = true
          // },

          // deleteItem (item) {
          //   const index = this.users.indexOf(item)
          //   confirm('Are you sure you want to delete this item?') && this.users.splice(index, 1)
          // },

          // close () {
          //   this.dialog = false
          //   setTimeout(() => {
          //     this.editedItem = Object.assign({}, this.defaultItem)
          //     this.editedIndex = -1
          //   }, 300)
          // },

          // save () {
          //   if (this.editedIndex > -1) {
          //     Object.assign(this.users[this.editedIndex], this.editedItem)
          //   } else {
          //     this.users.push(this.editedItem)
          //   }
          //   this.close()
          // },
        },
    }
</script>

<style scoped>
  .v-data-table__wrapper a:hover {
    text-decoration: underline;
  }
</style>
