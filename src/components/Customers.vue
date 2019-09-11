<template>
  <div>

    <v-card class="mb-4 filter-custom-box">
      <v-card-text class="pa-0">
        <v-row align="center">
          <v-col cols="12" md="2">
            <div class="pl-4">
              <h1>Customers</h1>
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
              label="Status"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6" class="align-center justify-end d-flex">
            <div class="pr-2">
              <v-btn color="filterBut1" @click="showAddCustomer" class="ma-2 white--text" fab><v-icon>mdi-plus</v-icon></v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-data-table
      :headers="headers"
      :items="customers"
      class="elevation-1"
    >
      <template v-slot:top>

        <!--dialogCustomer-->
        <v-dialog v-model="dialogCustomer" max-width="500px">
          <v-card>
            <v-card-title class="headline dialogHeader">
              <span class="headline" v-if="dialogCustomerData.name">Edit Customer: {{ dialogCustomerData.name }}</span>
              <span class="headline" v-else>Add Customer</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-text-field label="Name" :value="dialogCustomerData.name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-text-field label="Hubspot Company Id"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="date"
                          label="Renewal Date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title scrollable  color="selectedColors" >
                        <div class="flex-grow-1"></div>
                        <v-btn text color="blue darken-1" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>

                </v-row>
              </v-container>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="dialogBut1" text @click="dialogCustomer = false">Cancel</v-btn>
              <v-btn color="dialogBut2" @click="dialogCustomer = false">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--dialogCustomer-->


        <!--dialogStatus-->
        <v-dialog v-model="dialogStatus" max-width="500px">
          <v-card>
            <v-card-title class="headline dialogHeader">
              <span class="headline">Status</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12">
                    <b>{{ dialogStatusData.name }} | Status</b>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <b>Current status: <v-chip :color="dialogStatusData.status=='Active' ? 'green' : 'blue-grey darken-1'" dark>{{ dialogStatusData.status }}</v-chip></b>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="dialogBut1" text @click="dialogStatus = false">Cancel</v-btn>
              <!--<v-btn color="dialogBut2" @click="dialogStatus = false">Save</v-btn>-->
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--dialogStatus-->

        <!--dialogActiveUsers-->
        <v-dialog v-model="dialogActiveUsers" max-width="700px">
          <v-card>
            <v-card-title class="headline dialogHeader">
              <span class="headline">Active Users</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12">
                    <b>{{ dialogActiveUsersData.name }} | Active Users</b>
                  </v-col>
                  <v-col cols="12" sm="12" class="py-0"><v-checkbox color="selectedColors" label="Player 1 / Player"></v-checkbox></v-col>
                  <v-col cols="12" sm="12" class="py-0"><v-checkbox color="selectedColors" label="Player 2 / Player"></v-checkbox></v-col>
                  <v-col cols="12" sm="12" class="py-0"><v-checkbox color="selectedColors" label="Player 3 / Player"></v-checkbox></v-col>
                  <v-col cols="12" sm="12" class="py-0"><v-checkbox v-model="checkbox5" color="selectedColors" label="Player 4 / Player"></v-checkbox></v-col>

                  <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors" v-model="checkbox3" label="Coach 1 / Coach"></v-checkbox></v-col>
                  <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors" label="Admin App 1"></v-checkbox></v-col>
                  <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors" label="Admin App 2"></v-checkbox></v-col>
                  <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors" v-model="checkbox4" label="Coach 2 / Coach"></v-checkbox></v-col>
                  <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors" label="Admin App 1"></v-checkbox></v-col>
                  <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors" label="Admin App 2"></v-checkbox></v-col>
                  <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors" label="Coach 3 / Coach"></v-checkbox></v-col>
                  <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors" label="Admin App 1"></v-checkbox></v-col>
                  <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors" label="Admin App 2"></v-checkbox></v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="dialogBut1" text @click="dialogActiveUsers = false">Cancel</v-btn>
              <!--<v-btn color="dialogBut2" @click="dialogStatus = false">Save</v-btn>-->
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--dialogActiveUsers-->

        <!--dialogAdminUsers-->
        <v-dialog v-model="dialogAdminUsers" max-width="700px">
          <v-card>
            <v-card-title class="headline dialogHeader">
              <span class="headline">Admin Users</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12">
                    <b>{{ dialogAdminUsersData.name }} | Admin Users</b>
                  </v-col>
                  <v-col cols="12" sm="12" class="py-0"><v-checkbox color="selectedColors" label="Player 1 / Player"></v-checkbox></v-col>
                  <v-col cols="12" sm="12" class="py-0"><v-checkbox color="selectedColors"  label="Player 2 / Player"></v-checkbox></v-col>
                  <v-col cols="12" sm="12" class="py-0"><v-checkbox color="selectedColors"  label="Player 3 / Player"></v-checkbox></v-col>
                  <v-col cols="12" sm="12" class="py-0"><v-checkbox color="selectedColors"  label="Player 4 / Player"></v-checkbox></v-col>

                  <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  v-model="checkbox1" label="Coach 1 / Coach"></v-checkbox></v-col>
                  <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Admin App 1"></v-checkbox></v-col>
                  <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Admin App 2"></v-checkbox></v-col>
                  <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  v-model="checkbox2" label="Coach 2 / Coach"></v-checkbox></v-col>
                  <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Admin App 1"></v-checkbox></v-col>
                  <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Admin App 2"></v-checkbox></v-col>
                  <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Coach 3 / Coach"></v-checkbox></v-col>
                  <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Admin App 1"></v-checkbox></v-col>
                  <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Admin App 2"></v-checkbox></v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="dialogBut1" text @click="dialogAdminUsers = false">Cancel</v-btn>
              <!--<v-btn color="dialogBut2" @click="dialogStatus = false">Save</v-btn>-->
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--dialogAdminUsers-->

        <!--dialogHubspotCompany-->
        <v-dialog v-model="dialogHubspotCompany" max-width="500px">
          <v-card>
            <v-card-title class="headline dialogHeader">
              <span class="headline">HubSpot Company</span>
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
              <v-btn color="dialogBut1" text @click="dialogHubspotCompany = false">Cancel</v-btn>
              <!--<v-btn color="dialogBut2" @click="dialogStatus = false">Save</v-btn>-->
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--dialogHubspotCompany-->

        <!--dialogTeams-->
        <v-dialog v-model="dialogTeams" max-width="500px">
          <v-card>
            <v-card-title class="headline dialogHeader">
              <span class="headline">Teams</span>
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
              <v-btn color="dialogBut1" text @click="dialogTeams = false">Cancel</v-btn>
              <!--<v-btn color="dialogBut2" @click="dialogStatus = false">Save</v-btn>-->
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--dialogTeams-->

      </template>

      <template v-slot:item.name="{ item }">
        <a class="links--text" @click="dialogCustomer = true && (dialogCustomerData.name = item.name)">{{ item.name }}</a>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip @click="dialogStatus = true && (dialogStatusData.status = item.status, dialogStatusData.name = item.name)" :color="item.status=='Active' ? 'green' : 'blue-grey darken-1'" dark>{{ item.status }}</v-chip>
      </template>
      <template v-slot:item.teams="{ item }">
        <div v-for="team in item.teams">
          <a class="links--text" @click="dialogTeams = true">{{ team.name }}</a>
        </div>
      </template>
      <template v-slot:item.activeUsers="{ item }">
        <a class="links--text" @click="dialogActiveUsers = true && (dialogActiveUsersData.name = item.name)">{{ item.activeUsers }}</a>
      </template>
      <template v-slot:item.adminUsers="{ item }">
        <a class="links--text" @click="dialogAdminUsers = true && (dialogAdminUsersData.name = item.name)">{{ item.adminUsers }}</a>
      </template>
      <template v-slot:item.hubspotCompany="{ item }">
        <a class="links--text" @click="dialogHubspotCompany = true">{{ item.hubspotCompany }}</a>
      </template>

    </v-data-table>

  </div>
</template>

<script>
    export default {
      name: "Customers",
      data: () => ({
        search: '',
        filterSearchItems: ['Filter 1', 'Filter 2', 'Filter 3'],
        customers: [],
        dialogCustomer: false,
        dialogStatus: false,
        dialogActiveUsers: false,
        dialogAdminUsers: false,
        dialogHubspotCompany: false,
        dialogTeams: false,

        checkbox1: true,
        checkbox2: true,
        checkbox3: true,
        checkbox4: true,
        checkbox5: true,

        date: new Date().toISOString().substr(0, 10),
        menu: false,

        dialogAdminUsersData: {
          name: 'default',
        },

        dialogCustomerData: {
          name: 'default',
        },
        dialogStatusData: {
          name: 'default',
          status: 'default'
        },
        dialogActiveUsersData: {
          name: 'default',
        },

        headers: [
          { text: 'Name', align: 'left', value: 'name' },
          { text: 'Status', value: 'status' },
          { text: 'Renewal Date', value: 'renewalDate' },
          { text: 'Teams', value: 'teams' },
          { text: 'Active Users', value: 'activeUsers' },
          { text: 'Admin Users', value: 'adminUsers' },
          { text: 'HubSpot Company', value: 'hubspotCompany' },
        ],
      }),

      created () {
        this.initialize()
      },

      methods: {
        showAddCustomer () {
          this.dialogCustomerData.name = '',
          this.dialogCustomer = true
        },

        initialize () {
          this.customers = [
            {
              id: 1,
              name: 'Jason Oner',
              status: 'Active',
              renewalDate: '10/01/19',
              teams: [
                {id: 1, name: 'Phoenix Suns'},
                {id: 2, name: 'NAZ Suns'}
              ],
              activeUsers: 3,
              adminUsers: 2,
              hubspotCompany: 'Pepsi',
            },
            {
              id: 2,
              name: 'Travis Howard',
              status: 'Invited',
              renewalDate: '10/01/19',
              teams: [
                {id: 1, name: 'Knicks'},
              ],
              activeUsers: 3,
              adminUsers: 2,
              hubspotCompany: 'Company',
            },
            {
              id: 3,
              name: 'Cindy Baker',
              status: 'Active',
              renewalDate: '10/01/19',
              teams: [
                {id: 1, name: 'Cucambers'},
              ],
              activeUsers: 3,
              adminUsers: 2,
              hubspotCompany: 'CocaCola',
            },
            {
              id: 4,
              name: 'Alex Soborsky',
              status: 'Invited',
              renewalDate: '10/01/19',
              teams: [
                {id: 1, name: 'Tigers'},
                {id: 2, name: 'NAZ Suns'}
              ],
              activeUsers: 3,
              adminUsers: 2,
              hubspotCompany: 'Apple',
            },
            {
              id: 5,
              name: 'Alex Davidoff',
              status: 'Invited',
              renewalDate: '10/01/19',
              teams: [
                {id: 1, name: 'NAZ Suns'}
              ],
              activeUsers: 3,
              adminUsers: 2,
              hubspotCompany: 'Google',
            },

            {
              id: 6,
              name: 'Jason Oner',
              status: 'Active',
              renewalDate: '10/01/19',
              teams: [
                {id: 1, name: 'Phoenix Suns'},
                {id: 2, name: 'NAZ Suns'}
              ],
              activeUsers: 3,
              adminUsers: 2,
              hubspotCompany: 'Pepsi',
            },
            {
              id: 7,
              name: 'Travis Howard',
              status: 'Invited',
              renewalDate: '10/01/19',
              teams: [
                {id: 1, name: 'Knicks'},
              ],
              activeUsers: 3,
              adminUsers: 2,
              hubspotCompany: 'Company',
            },
            {
              id: 8,
              name: 'Cindy Baker',
              status: 'Active',
              renewalDate: '10/01/19',
              teams: [
                {id: 1, name: 'Cucambers'},
              ],
              activeUsers: 3,
              adminUsers: 2,
              hubspotCompany: 'CocaCola',
            },
            {
              id: 9,
              name: 'Alex Soborsky',
              status: 'Invited',
              renewalDate: '10/01/19',
              teams: [
                {id: 1, name: 'Tigers'},
                {id: 2, name: 'NAZ Suns'}
              ],
              activeUsers: 3,
              adminUsers: 2,
              hubspotCompany: 'Apple',
            },
            {
              id: 10,
              name: 'Alex Davidoff',
              status: 'Invited',
              renewalDate: '10/01/19',
              teams: [
                {id: 1, name: 'NAZ Suns'}
              ],
              activeUsers: 3,
              adminUsers: 2,
              hubspotCompany: 'Google',
            },

            {
              id: 11,
              name: 'Jason Oner',
              status: 'Active',
              renewalDate: '10/01/19',
              teams: [
                {id: 1, name: 'Phoenix Suns'},
                {id: 2, name: 'NAZ Suns'}
              ],
              activeUsers: 3,
              adminUsers: 2,
              hubspotCompany: 'Pepsi',
            },
            {
              id: 12,
              name: 'Travis Howard',
              status: 'Invited',
              renewalDate: '10/01/19',
              teams: [
                {id: 1, name: 'Knicks'},
              ],
              activeUsers: 3,
              adminUsers: 2,
              hubspotCompany: 'Company',
            },
            {
              id: 13,
              name: 'Cindy Baker',
              status: 'Active',
              renewalDate: '10/01/19',
              teams: [
                {id: 1, name: 'Cucambers'},
              ],
              activeUsers: 3,
              adminUsers: 2,
              hubspotCompany: 'CocaCola',
            },
            {
              id: 14,
              name: 'Alex Soborsky',
              status: 'Invited',
              renewalDate: '10/01/19',
              teams: [
                {id: 1, name: 'Tigers'},
                {id: 2, name: 'NAZ Suns'}
              ],
              activeUsers: 3,
              adminUsers: 2,
              hubspotCompany: 'Apple',
            },
            {
              id: 15,
              name: 'Alex Davidoff',
              status: 'Invited',
              renewalDate: '10/01/19',
              teams: [
                {id: 1, name: 'NAZ Suns'}
              ],
              activeUsers: 3,
              adminUsers: 2,
              hubspotCompany: 'Google',
            },
          ]
        }
      }
    }
</script>

<style scoped>
  .v-data-table__wrapper a:hover {
    text-decoration: underline;
  }
</style>
