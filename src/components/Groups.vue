<template>
    <div>
      <v-card class="mb-4 filter-custom-box">
        <v-card-text class="pa-0">
          <v-row align="center">
            <v-col cols="12" md="2">
              <div class="pl-4">
                <h1>User Groups</h1>
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
            <v-col cols="12" md="6" class="align-center justify-end d-flex">
              <div class="pr-2">
                <v-btn color="filterBut1" @click="showAddGroupInfo" class="ma-2 white--text" fab><v-icon>mdi-plus</v-icon></v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>



      <v-data-table
        :headers="headers"
        :items="groups"
        class="elevation-1"
      >
        <template v-slot:top>

          <v-dialog v-model="dialogGroupsInfo" max-width="500px">
            <v-card>
              <v-card-title class="headline dialogHeader">
                <span class="headline" v-if="dialogGroupsInfoData.name">Edit Group: {{ dialogGroupsInfoData.name }}</span>
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
                      <v-text-field label="Name" :value="dialogGroupsInfoData.name"></v-text-field>
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

          <!--dialogMembers-->
          <v-dialog v-model="dialogMembers" max-width="700px">
            <v-card>
              <v-card-title class="headline dialogHeader">
                <span class="headline">Add/Edit Members</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-col cols="12" sm="12">
                    <b>{{ dialogMembersData.name }} | Member</b>
                  </v-col>
                  <v-row>
                    <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Player 1 / Player"></v-checkbox></v-col>
                    <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Player 2 / Player"></v-checkbox></v-col>
                    <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Player 3 / Player"></v-checkbox></v-col>
                    <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Player 4 / Player"></v-checkbox></v-col>
                    <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Player 5 / Player"></v-checkbox></v-col>
                    <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Player 6 / Player"></v-checkbox></v-col>
                    <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  v-model="checkbox3" label="Coach 1 / Coach"></v-checkbox></v-col>
                    <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  v-model="checkbox4" label="Coach 2 / Coach"></v-checkbox></v-col>
                    <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  v-model="checkbox5" label="Coach 3 / Coach"></v-checkbox></v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="dialogBut1" text @click="dialogMembers = false">Cancel</v-btn>
                <!--<v-btn color="dialogBut2" @click="dialogStatus = false">Save</v-btn>-->
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--dialogMembers-->
        </template>

        <template v-slot:item.customer="{ item }">
          <a class="links--text" @click="dialogGroupsInfo = true && (dialogGroupsInfoData.name = item.name)">{{ item.customer }}</a>
        </template>

        <template v-slot:item.members="{ item }">
          <a class="links--text" @click="dialogMembers = true && (dialogMembersData.name = item.name)">{{ item.members }} - edit</a>
        </template>
      </v-data-table>

    </div>
</template>

<script>
    export default {
      name: "Groups",
      data: () => ({
        search: '',
        filterSearchItems: ['Filter 1', 'Filter 2', 'Filter 3'],
        comboboxItems: [
          'Customer 1',
          'Customer 2',
          'Customer 3',
          'Customer 4',
          'Customer 5',
        ],
        dialogGroupsInfo: false,
        dialogMembers: false,

        checkbox3: true,
        checkbox4: true,
        checkbox5: true,

        groups: [],
        headers: [
          { text: 'Name', value: 'name', sortable: false },
          { text: 'Customer', value: 'customer' },
          { text: 'Members', value: 'members' },
        ],

        dialogGroupsInfoData: {
          name: 'default',
        },
        dialogMembersData: {
          name: 'default',
        },

      }),
      created () {
        this.initialize()
      },
      methods: {
        initialize() {
          this.groups = [
            {
              id: 1,
              name: 'Forwards',
              customer: 'Customer 1',
              members: 3,
            },
            {
              id: 2,
              name: 'Forwards 2',
              customer: 'Customer 2',
              members: 3,
            },
            {
              id: 3,
              name: 'Forwards 3',
              customer: 'Customer 3',
              members: 3,
            },
            {
              id: 4,
              name: 'Forwards 4',
              customer: 'Customer 4',
              members: 3,
            },
            {
              id: 5,
              name: 'Forwards 5',
              customer: 'Customer 5',
              members: 3,
            },
            {
              id: 6,
              name: 'Forwards 6',
              customer: 'Customer 1',
              members: 3,
            },
            {
              id: 7,
              name: 'Forwards 7',
              customer: 'Customer 2',
              members: 3,
            },
            {
              id: 8,
              name: 'Forwards 8',
              customer: 'Customer 3',
              members: 3,
            },
            {
              id: 9,
              name: 'Forwards 9',
              customer: 'Customer 4',
              members: 3,
            },
            {
              id: 10,
              name: 'Forwards 10',
              customer: 'Customer 5',
              members: 3,
            },
          ]
        },
        showAddGroupInfo () {
          this.dialogGroupsInfoData.name = '',
          this.dialogGroupsInfo = true
        }
      }
    }
</script>

<style scoped>

</style>
