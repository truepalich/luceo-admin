<template>
    <div>
      <v-card color="white" class="mb-4 filter-custom-box">
        <v-card-text class="pa-0">
          <v-row align="center">
            <v-col cols="12" md="2">
              <div class="pl-4">
                <h1>Apps</h1>
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
                label="Type/Platform"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                :items="filterSearchItems"
                label="Enviroment"
              ></v-select>
            </v-col>
            <v-col cols="12" md="4" class="align-center justify-end d-flex">
              <div class="pr-2">
                <v-btn color="orange" @click="showAppInfo" class="ma-2 white--text" fab><v-icon>mdi-plus</v-icon></v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>


      <v-data-table
        :headers="headers"
        :items="apps"
        class="elevation-1"
      >
        <template v-slot:top>

          <!--dialogAvatar-->
          <v-dialog v-model="dialogAvatar" max-width="500px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span class="headline">Change app avatar</span>
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


          <!--dialogAppInfo-->
          <v-dialog v-model="dialogAppInfo" max-width="500px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span class="headline" v-if="dialogAppInfoData.name">Edit App: {{ dialogAppInfoData.name }}</span>
                <span class="headline" v-else>Add App</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-text-field label="Name" :value="dialogAppInfoData.name"></v-text-field>
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
                <v-btn color="blue darken-1" text @click="dialogAppInfo = false">Cancel</v-btn>
                <v-btn color="primary" @click="dialogAppInfo = false">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--dialogAppInfo-->


          <!--dialogCustomPermissions-->
          <v-dialog v-model="dialogCustomPermissions" max-width="600px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span class="headline">Custom Permissions: {{ dialogCustomPermissionsData.name }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>

                    <v-col cols="12" sm="12">

                      <v-simple-table>
                        <thead>
                          <tr>
                            <th class="text-left">Label</th>
                            <th class="text-left">Description</th>
                            <th class="text-left">InternalKey</th>
                            <th class="text-left"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in permissionList" :key="item.name">
                            <td>{{ item.label }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.internalKey }}</td>
                            <td>
                              <v-btn icon>
                                <v-icon color="primary">mdi-delete</v-icon>
                              </v-btn>
                            </td>
                          </tr>
                        </tbody>
                      </v-simple-table>

                    </v-col>

                    <v-col cols="12" sm="12">
                      <v-text-field label="Label"></v-text-field>
                      <v-text-field label="Description"></v-text-field>
                      <v-text-field label="InternalKey"></v-text-field>
                      <v-btn color="primary">Add</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="dialogCustomPermissions = false">Cancel</v-btn>
                <v-btn color="primary" @click="dialogCustomPermissions = false">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--dialogCustomPermissions-->


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
          <a @click="dialogAppInfo = true && (dialogAppInfoData.name = item.name)">{{ item.name }}</a>
        </template>

        <template v-slot:item.customPermissions="{ item }">
          <a @click="dialogCustomPermissions = true && (dialogCustomPermissionsData.name = item.name)">View/Edit</a>
        </template>

      </v-data-table>
    </div>
</template>

<script>
    export default {
      name: "Apps",
      data: () => ({
        search: '',
        filterSearchItems: ['Filter 1', 'Filter 2', 'Filter 3'],
        apps: [],
        dialogAvatar: false,
        dialogAppInfo: false,
        dialogCustomPermissions: false,

        dialogAvatarData: {
          userName: 'default',
        },
        dialogAppInfoData: {
          userName: 'default',
        },
        dialogCustomPermissionsData: {
          userName: 'default',
        },

        permissionList: [
          { id: 1, label: 'Permission 1', description: 'Lorem ipsum', internalKey: 'PERMISSION_1' },
          { id: 2, label: 'Permission 2', description: 'Lorem ipsum', internalKey: 'PERMISSION_2' },
          { id: 3, label: 'Permission 3', description: 'Lorem ipsum', internalKey: 'PERMISSION_3' },
        ],

        comboboxItems: [
          'Combobox 1',
          'Combobox 2',
          'Combobox 3',
          'Combobox 4',
        ],

        headers: [
          { text: 'Icon', value: 'headshot', sortable: false },
          { text: 'Name', value: 'name' },
          { text: 'Type', value: 'type', sortable: false },
          { text: 'Platform', value: 'platform' },
          { text: 'Enviroment', value: 'enviroment' },
          { text: 'URL', value: 'url' },
          { text: 'Azure App Service Name', value: 'azureAppServiceName' },
          { text: 'Custom Permissions', value: 'customPermissions' },
        ],

      }),

      created () {
        this.initialize()
      },

      methods: {
        initialize() {
          this.apps = [
            {
              id: 1,
              headshot: '',
              name: 'Session Tracker',
              type: 'Workflow / Admin',
              platform: 'WEB',
              enviroment: 'DEV',
              url: 'https://ls-sessiontracker-dev.azurewebsites.net/',
              azureAppServiceName: 'ls-sessiontracker-dev',
            },
            {
              id: 2,
              headshot: '',
              name: 'Session Tracker Prod',
              type: 'Workflow / Admin',
              platform: 'WEB',
              enviroment: 'PROD',
              url: 'https://ls-sessiontracker-prod.azurewebsites.net/',
              azureAppServiceName: 'ls-sessiontracker-prod',
            },
            {
              id: 3,
              headshot: '',
              name: 'Assist IOS Prod',
              type: 'Workflow / Admin',
              platform: 'IOS',
              enviroment: 'PROD',
              url: 'https://assist.net/',
              azureAppServiceName: 'assist-prod',
            },
            {
              id: 4,
              headshot: '',
              name: 'Assist IOS',
              type: 'Workflow / Admin',
              platform: 'IOS',
              enviroment: 'DEV',
              url: 'https://dev-assist.net/',
              azureAppServiceName: 'dev-assist-prod',
            },
            {
              id: 5,
              headshot: '',
              name: 'Assist Android',
              type: 'Workflow / Admin',
              platform: 'Android',
              enviroment: 'DEV',
              url: 'https://dev-assist.net/',
              azureAppServiceName: 'dev-assist-prod',
            },
          ]
        },

        showAppInfo () {
          this.dialogAppInfoData.name = '',
          this.dialogAppInfo = true
        }

      }
    }
</script>

<style scoped>

</style>
