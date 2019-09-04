<template>
    <div>

      <v-card color="white" class="mb-4 filter-custom-box">
        <v-card-text class="pa-0">
          <v-row align="center">
            <v-col cols="12" md="2">
              <div class="pl-4">
                <h1>Teams</h1>
              </div>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                :items="filterSearchItems"
                label="Customer"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                :items="filterSearchItems"
                label="League"
              ></v-select>
            </v-col>
            <v-col cols="12" md="4" class="align-center justify-end d-flex">
              <div class="pr-2">
                <v-btn color="orange" @click="showAddTeamInfo" class="ma-2 white--text" fab><v-icon>mdi-plus</v-icon></v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>


      <v-data-table
        :headers="headers"
        :items="teams"
        class="elevation-1"
      >
        <template v-slot:top>

          <!--dialogAvatar-->
          <v-dialog v-model="dialogAvatar" max-width="500px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span class="headline">Change team logo</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <b>{{ dialogAvatarData.teamName }}</b>
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

          <!--dialogActiveUsers-->
          <v-dialog v-model="dialogActiveUsers" max-width="700px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span class="headline">Active Users</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <b>{{ dialogActiveUsersData.name }} | Active Users</b>
                    </v-col>
                    <v-col cols="12" sm="12" class="py-0"><v-checkbox label="Player 1 / Player"></v-checkbox></v-col>
                    <v-col cols="12" sm="12" class="py-0"><v-checkbox label="Player 2 / Player"></v-checkbox></v-col>
                    <v-col cols="12" sm="12" class="py-0"><v-checkbox label="Player 3 / Player"></v-checkbox></v-col>
                    <v-col cols="12" sm="12" class="py-0"><v-checkbox v-model="checkbox5" label="Player 4 / Player"></v-checkbox></v-col>

                    <v-col cols="12" sm="4" class="py-0"><v-checkbox v-model="checkbox3" label="Coach 1 / Coach"></v-checkbox></v-col>
                    <v-col cols="12" sm="4" class="py-0"><v-checkbox label="Admin App 1"></v-checkbox></v-col>
                    <v-col cols="12" sm="4" class="py-0"><v-checkbox label="Admin App 2"></v-checkbox></v-col>
                    <v-col cols="12" sm="4" class="py-0"><v-checkbox v-model="checkbox4" label="Coach 2 / Coach"></v-checkbox></v-col>
                    <v-col cols="12" sm="4" class="py-0"><v-checkbox label="Admin App 1"></v-checkbox></v-col>
                    <v-col cols="12" sm="4" class="py-0"><v-checkbox label="Admin App 2"></v-checkbox></v-col>
                    <v-col cols="12" sm="4" class="py-0"><v-checkbox label="Coach 3 / Coach"></v-checkbox></v-col>
                    <v-col cols="12" sm="4" class="py-0"><v-checkbox label="Admin App 1"></v-checkbox></v-col>
                    <v-col cols="12" sm="4" class="py-0"><v-checkbox label="Admin App 2"></v-checkbox></v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="dialogActiveUsers = false">Cancel</v-btn>
                <!--<v-btn color="primary" @click="dialogStatus = false">Save</v-btn>-->
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--dialogActiveUsers-->


          <!--dialogLuceoSetup-->
          <v-dialog v-model="dialogLuceoSetup" max-width="500px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span class="headline">Luceo Setup</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <b>{{ dialogLuceoSetupData.name }} | Luceo Setup</b>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-text-field label="AAD Group ID"></v-text-field>
                      <v-text-field label="Container"></v-text-field>
                      <v-text-field label="File Name"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="dialogLuceoSetup = false">Cancel</v-btn>
                <v-btn color="primary" @click="dialogLuceoSetup = false">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--dialogLuceoSetup-->


          <!--dialogCustomers-->
          <v-dialog v-model="dialogCustomers" max-width="500px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span class="headline">Customer</span>
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


          <!--dialogColorSettings-->
          <v-dialog v-model="dialogColorSettings" max-width="600px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span class="headline">Color settings</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <b>{{ dialogColorSettingsData.name }} | Color settings</b>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <b>Primary:</b>
                      <v-color-picker hide-canvas mode="hexa"></v-color-picker>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <b>Primary (Dark):</b>
                      <v-color-picker hide-canvas mode="hexa"></v-color-picker>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <b>Secondary:</b>
                      <v-color-picker hide-canvas mode="hexa"></v-color-picker>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <b>Tertiary:</b>
                      <v-color-picker hide-canvas mode="hexa"></v-color-picker>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="dialogColorSettings = false">Cancel</v-btn>
                <v-btn color="primary" @click="dialogColorSettings = false">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--dialogColorSettings-->


          <!--dialogTeamInfo-->
          <v-dialog v-model="dialogTeamInfo" max-width="500px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span class="headline" v-if="dialogTeamInfoData.name">Edit Team: {{ dialogTeamInfoData.name }}</span>
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
                      <v-text-field label="Name" :value="dialogTeamInfoData.name"></v-text-field>
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
                <v-btn color="blue darken-1" text @click="dialogTeamInfo = false">Cancel</v-btn>
                <v-btn color="primary" @click="dialogTeamInfo = false">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--dialogTeamInfo-->



          <!--dialogCustomLocations-->
          <v-dialog v-model="dialogCustomLocations" max-width="500px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span class="headline">Locations: {{ dialogCustomLocationsData.name }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <b>{{ dialogCustomLocationsData.name }} | Locations</b>
                    </v-col>

                    <v-col cols="12" sm="12">
                      <v-list style="border-top: 1px solid #ccc">
                        <v-list-item
                          v-for="item in locations"
                          :key="item.title"
                          style="border-bottom: 1px solid #ccc"
                        >
                          <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                            <v-list-item-subtitle v-text="item.address"></v-list-item-subtitle>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-btn icon>
                              <v-icon color="primary">mdi-delete</v-icon>
                            </v-btn>
                          </v-list-item-action>

                        </v-list-item>
                      </v-list>
                    </v-col>

                    <v-col cols="12" sm="12">
                      <p><b>Add new custom location:</b></p>
                      <v-text-field label="Name"></v-text-field>
                      <v-text-field label="Address"></v-text-field>
                      <v-btn color="primary">Add</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="dialogCustomLocations = false">Cancel</v-btn>
                <v-btn color="primary" @click="dialogCustomLocations = false">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--dialogCustomLocations-->


          <!--dialogTeamProfile-->
          <v-dialog v-model="dialogTeamProfile" max-width="500px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span class="headline">Team Profile</span>
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
                <v-btn color="blue darken-1" text @click="dialogTeamProfile = false">Cancel</v-btn>
                <!--<v-btn color="primary" @click="dialogPlayerProfile = false">Save</v-btn>-->
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--dialogTeamProfile-->


        </template>

        <template v-slot:item.headshot="{ item }">
          <v-avatar v-if="item.headshot" size="36px" @click="dialogAvatar = true && (dialogAvatarData.teamName = item.name)" style="cursor: pointer">
            <img :src="item.headshot" alt="avatar">
          </v-avatar>
          <v-avatar v-else color="grey" size="36px" @click="dialogAvatar = true && (dialogAvatarData.teamName = item.name)" style="cursor: pointer">
            <v-icon dark>mdi-account-circle</v-icon>
          </v-avatar>
          <v-icon color="primary" small @click="dialogAvatar = true && (dialogAvatarData.teamName = item.name)">mdi-pencil</v-icon>
        </template>

        <template v-slot:item.name="{ item }">
          <a @click="dialogTeamInfo = true && (dialogTeamInfoData.name = item.name)">{{ item.name }}</a>
        </template>

        <template v-slot:item.activeUsers="{ item }">
          <a @click="dialogActiveUsers = true && (dialogActiveUsersData.name = item.name)">{{ item.activeUsers }}</a>
        </template>

        <template v-slot:item.customLocations="{ item }">
          <a @click="dialogCustomLocations = true && (dialogCustomLocationsData.name = item.name)">View ({{ item.customLocations }})</a>
        </template>

        <template v-slot:item.colorSettings="{ item }">
          <a @click="dialogColorSettings = true && (dialogColorSettingsData.name = item.name)">XXX Setup</a>
        </template>

        <template v-slot:item.teamProfile="{ item }">
          <a @click="dialogTeamProfile = true">View</a>
        </template>

        <template v-slot:item.luceoSetup="{ item }">
          <a @click="dialogLuceoSetup = true && (dialogLuceoSetupData.name = item.name)">Setup/View</a>
        </template>

        <template v-slot:item.customer="{ item }">
          <a @click="dialogCustomers = true">{{ item.customer }}</a>
        </template>

      </v-data-table>


    </div>
</template>

<script>
    export default {
      name: "Teams",
      data: () => ({
        search: '',
        filterSearchItems: ['Filter 1', 'Filter 2', 'Filter 3'],
        dialogAvatar: false,
        dialogActiveUsers: false,
        dialogLuceoSetup: false,
        dialogCustomers: false,
        dialogColorSettings: false,
        dialogTeamInfo: false,
        dialogCustomLocations: false,
        dialogTeamProfile: false,

        checkbox3: true,
        checkbox4: true,
        checkbox5: true,

        dialogAvatarData: {
          teamName: 'default',
        },

        dialogActiveUsersData: {
          name: 'default',
        },

        dialogLuceoSetupData: {
          name: 'default',
        },

        dialogColorSettingsData: {
          name: 'default',
        },

        dialogTeamInfoData: {
          name: 'default',
        },

        dialogCustomLocationsData: {
          name: 'default',
        },

        comboboxItems: [
          'Programming',
          'Design',
          'Vue',
          'Vuetify',
        ],

        locations: [
          { title: 'Location name', address: 'Acorn Street, Boston, MA, USA' },
          { title: 'Location name', address: 'Acorn Street, Boston, MA, USA' },
          { title: 'Location name', address: 'Acorn Street, Boston, MA, USA' }
        ],

        teams: [],
        headers: [
          { text: 'Logo', value: 'headshot', align: 'left', sortable: false },
          { text: 'Team Name', value: 'name' },
          { text: 'League', value: 'league' },
          { text: 'Active Users', value: 'activeUsers' },
          { text: 'Custom Locations', value: 'customLocations' },
          { text: 'Color Settings', value: 'colorSettings' },
          { text: 'Team Profile', value: 'teamProfile' },
          { text: 'Luceo Setup', value: 'luceoSetup' },
          { text: 'Customer', value: 'customer' },
        ],
      }),

      created () {
        this.initialize()
      },

      methods: {
        initialize () {
          this.teams = [
            {
              id: 1,
              headshot: '',
              name: 'Phoenix Suns',
              league: 'NBA',
              activeUsers: 3,
              customLocations: 3,
              colorSettings: true,
              teamProfile: 'https://www.google.com/',
              customer: 'Customer 1'
            },
            {
              id: 2,
              headshot: '',
              name: 'Memphis Tigers',
              league: 'NBA',
              activeUsers: 4,
              customLocations: 3,
              colorSettings: true,
              teamProfile: 'https://www.google.com/',
              customer: 'Customer 2'
            },
            {
              id: 3,
              headshot: '',
              name: 'Chicago Bulls',
              league: 'NBA',
              activeUsers: 3,
              customLocations: 4,
              colorSettings: true,
              teamProfile: 'https://www.google.com/',
              customer: 'Customer 3'
            },
            {
              id: 4,
              headshot: '',
              name: 'Atalanta',
              league: 'NBA',
              activeUsers: 5,
              customLocations: 3,
              colorSettings: true,
              teamProfile: 'https://www.google.com/',
              customer: 'Customer 4'
            },
            {
              id: 5,
              headshot: '',
              name: 'Toronto Balls',
              league: 'NBA',
              activeUsers: 6,
              customLocations: 3,
              colorSettings: true,
              teamProfile: 'https://www.google.com/',
              customer: 'Customer 4'
            },
            {
              id: 6,
              headshot: '',
              name: 'Dynamo',
              league: 'NBA',
              activeUsers: 4,
              customLocations: 3,
              colorSettings: true,
              teamProfile: 'https://www.google.com/',
              customer: 'Customer 5'
            },
            {
              id: 7,
              headshot: '',
              name: 'West Cost Custom',
              league: 'NBA',
              activeUsers: 6,
              customLocations: 3,
              colorSettings: true,
              teamProfile: 'https://www.google.com/',
              customer: 'Customer 6'
            },
            {
              id: 8,
              headshot: '',
              name: 'Georgia',
              league: 'NBA',
              activeUsers: 4,
              customLocations: 3,
              colorSettings: true,
              teamProfile: 'https://www.google.com/',
              customer: 'Customer 6'
            },
            {
              id: 9,
              headshot: '',
              name: 'Grizzles',
              league: 'NBA',
              activeUsers: 2,
              customLocations: 3,
              colorSettings: true,
              teamProfile: 'https://www.google.com/',
              customer: 'Customer 7'
            },
          ]
        },
        showAddTeamInfo () {
          this.dialogTeamInfoData.name = '',
          this.dialogTeamInfo = true
        }
      }
    }
</script>

<style scoped>

</style>
