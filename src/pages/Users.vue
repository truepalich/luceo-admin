<template>
  <div>

    <Filters :data="dynamicCurrentData"></Filters>

    <v-data-table
      :headers="headers"
      :items="users"
      :loading="loading"
      class="elevation-1"
      show-select
      dark
    >
      <template v-slot:item.headshot="{ item }">
        <v-avatar v-if="item.headshot" size="36px" @click.prevent="showDialogAndTransferEvent(item, 'show-change-logo-dialog')" style="cursor: pointer">
          <img :src="item.headshot" alt="avatar">
        </v-avatar>
        <v-avatar v-else color="orange darken-1" size="36px" @click.prevent="showDialogAndTransferEvent(item, 'show-change-logo-dialog')" style="cursor: pointer">
          <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>
        <v-icon color="links" small @click.prevent="showDialogAndTransferEvent(item, 'show-change-logo-dialog')">mdi-pencil</v-icon>
      </template>
      <template v-slot:item.name="{ item }">
        <a class="links--text" @click.prevent="showDialogAndTransferEvent(item, 'show-add-edit-dialog', $route.name, 'add-edit')">{{ item.name }}</a>
      </template>
      <template v-slot:item.teamsRolesGroups="{ item }">
        <div v-for="trg in item.teamsRolesGroups">
          <a class="links--text" @click.prevent="showDialogAndTransferEvent(item, 'show-teams-roles-groups-dialog')">{{ trg.name }}/{{ trg.type }}</a>
        </div>
      </template>
      <template v-slot:item.appsPermissions="{ item }">
        <a class="links--text" @click.prevent="showDialogAndTransferEvent(item, 'show-app-permissions-dialog')">{{ item.appsPermissions }}</a>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip @click.prevent="showDialogAndTransferEvent(item, 'show-status-dialog', $route.name)" :color="item.status == 'Active' ? 'green' : 'blue-grey darken-1'" dark>{{ item.status }}</v-chip>
      </template>
      <template v-slot:item.activity="{ item }">
        <a class="links--text" @click.prevent="showDialogAndTransferEvent(item, 'show-activity-dialog')" v-html="item.activity"></a>
      </template>
      <template v-slot:item.playerProfile="{ item }">
        <a class="links--text" @click.prevent="showDialogAndTransferEvent(item, 'show-coming-soon-dialog')">{{ item.playerProfile }}</a>
      </template>
      <template v-slot:item.customers="{ item }">
        <a class="links--text" @click.prevent="showDialogAndTransferEvent(item, 'show-coming-soon-dialog')">{{ item.customers }}</a>
      </template>
    </v-data-table>

    <ComingSoonDialog :data="dynamicCurrentData"></ComingSoonDialog>
    <ChangeLogoDialog :data="dynamicCurrentData"></ChangeLogoDialog>
    <ActivityDialog :data="dynamicCurrentData"></ActivityDialog>
    <StatusDialog :data="dynamicCurrentData"></StatusDialog>
    <AppPermissionsDialog :data="dynamicCurrentData"></AppPermissionsDialog>
    <TeamsRolesGroupsDialog :data="dynamicCurrentData"></TeamsRolesGroupsDialog>
    <AddEditDialog :data="dynamicCurrentData"></AddEditDialog>

  </div>
</template>

<script>
  import ComingSoonDialog from "../components/base/ComingSoonDialog";
  import Filters from "../components/Filters";
  import ChangeLogoDialog from "../components/base/ChangeLogoDialog";
  import ActivityDialog from "../components/users/ActivityDialog";
  import StatusDialog from "../components/base/StatusDialog";
  import AppPermissionsDialog from "../components/users/AppPermissionsDialog";
  import TeamsRolesGroupsDialog from "../components/users/TeamsRolesGroupsDialog";
  import AddEditDialog from "../components/base/AddEditDialog";
  import {Mixin} from "../mixins/Mixin";

  export default {
    name: "Users",
    mixins: [Mixin],
    components: {
      AddEditDialog,
      TeamsRolesGroupsDialog,
      AppPermissionsDialog, StatusDialog, ActivityDialog, ChangeLogoDialog, Filters, ComingSoonDialog},
    data: () => ({
      loading: true,

      users: [],

      currentData: {
        itemData: {},
        dialogData: {
          entity: 'User',
          fields: [],
        },
        filterData: []
      },

      headers: [
        { text: 'Headshot', value: 'headshot', sortable: false },
        { text: 'Full Name', align: 'left', value: 'name' },
        { text: 'Teams & Roles & Groups', value: 'teamsRolesGroups' },
        { text: 'Apps & Permissions', value: 'appsPermissions' },
        { text: 'Account status', value: 'status' },
        { text: 'Activity (2 weeks)', value: 'activity' },
        { text: 'Player Profile', value: 'playerProfile', },
        { text: 'Customers', value: 'customers', },
      ],
    }),

    computed: {
      dynamicCurrentData () {
        var currData = this.currentData;
        currData.dialogData.fields = [
          { key: "Email", type: "text-field", label: "Email", value: "", items: "",},
          { type: "text-html", label: "If a user with this email already exists - prepopulate the form below + allow edit", size: "8" },
          { type: "button", label: "Check", size: "4" },
          { key: "CustomerID", type: "select", label: "Customers", value: "", items: this.$store.getters.getCurrentRelationByKey('customers') },
          { key: "User_Name", type: "text-field", label: "User name", value: "", items: "" },
          { key: "MobilePhone", type: "text-field", label: "Mob.Phone", value: "", items: "", size: "6" },
          { key: "AltEmail", type: "text-field", label: "Alt.Email", value: "", items: "", size: "6" },
          { key: "HubSpotId", type: "text-field", label: "HubSpot Cont. Id", value: "", items: "", size: "6" },
          { key: "PlayerProfile", type: "combobox", label: "Player Profile", value: "", items: this.$store.getters.getCurrentRelationByKey('playerProfiles'), size: "6" },
        ],
        currData.filterData = [
          { key: "search", type: "text-field", label: "Search", value: "", items: "", size: "2" },
          { key: "teams", type: "select", label: "Team", value: "", items: this.$store.getters.getCurrentFilterByKey('teams'), size: "1" },
          { key: "status", type: "select", label: "Status", value: "", items: this.$store.getters.getCurrentFilterByKey('status'), size: "1" },
          { key: "customers", type: "select", label: "Customer", value: "", items: this.$store.getters.getCurrentFilterByKey('customers'), size: "1" },
          { key: "apps", type: "select", label: "App", value: "", items: this.$store.getters.getCurrentFilterByKey('apps'), size: "1" },
          { key: "groups", type: "select", label: "Group", value: "", items: this.$store.getters.getCurrentFilterByKey('groups'), size: "1" },
          { key: "roles", type: "select", label: "Role", value: "", items: this.$store.getters.getCurrentFilterByKey('roles'), size: "1" },
          { key: "actions", type: "action", size: "2" },
        ]
        return currData;
      }
    },

    created () {

    },

    methods: {
      initialize () {
        setTimeout( ()=> {
          this.users = [
            {
              id: 1,
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
              status: 'Active',
              activity: 'Session Tr.(32): 08/15/19 hh:mm:ss pm<br/>' +
                        'Assist (32): 08/15/19 hh:mm:ss pm<br/>' +
                        'more...',
              playerProfile: 'Fernando Torres',
              customers: 'Customer 1, Customer 2'
            },
            {
              id: 2,
              headshot: '',
              name: 'Travis Howard',
              firstName: 'Travis',
              lastName: 'Howard',
              teamsRolesGroups: [
                { id: 1, name: 'Team One', type: 'Player'},
              ],
              appsPermissions: 'Whiteboard',
              status: 'Invited',
              activity: 'Session Tr.(32): 08/15/19 hh:mm:ss pm',
              playerProfile: 'Alex Morozenko',
              customers: 'Customer 4'
            },
            {
              id: 3,
              headshot: '',
              name: 'Alli Connors',
              firstName: 'Alli',
              lastName: 'Connors',
              teamsRolesGroups: [
                { id: 2, name: 'Team Two', type: 'Player'},
              ],
              appsPermissions: 'Team One: Session Tracker, Whiteboard',
              status: 'Invited',
              activity:
              'Assist (32): 08/15/19 hh:mm:ss pm<br/>' +
              'more...',
              playerProfile: 'Luca Modric',
              customers: 'Customer 5'
            },
            {
              id: 4,
              headshot: '',
              name: 'Cindy Baker',
              firstName: 'Cindy',
              lastName: 'Baker',
              teamsRolesGroups: [
                { id: 1, name: 'Team Three', type: 'Player'},
              ],
              appsPermissions: 'Whiteboard',
              status: 'Invited',
              activity: 'Session Tr.(33): 08/15/19 hh:mm:ss pm',
              playerProfile: 'Marcus Scott',
              customers: 'Customer 10'
            },
            {
              id: 5,
              headshot: '',
              name: 'Alex Soborsky',
              firstName: 'Alex',
              lastName: 'Soborsky',
              teamsRolesGroups: [
                { id: 1, name: 'Team One', type: 'Coach'},
                { id: 2, name: 'Team Two', type: 'Player'},
              ],
              appsPermissions: 'Team One: Whiteboard',
              status: 'Active',
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
              status: 'Active',
              activity: 'Session Tr.(32): 08/15/19 hh:mm:ss pm<br/>' +
              'Assist (32): 08/15/19 hh:mm:ss pm<br/>' +
              'more...',
              playerProfile: 'Fernando Torres',
              customers: 'Customer 1, Customer 2'
            },
            {
              id: 7,
              headshot: '',
              name: 'Travis Howard',
              firstName: 'Travis',
              lastName: 'Howard',
              teamsRolesGroups: [
                { id: 1, name: 'Team One', type: 'Player'},
              ],
              appsPermissions: 'Whiteboard',
              status: 'Invited',
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
              status: 'Invited',
              activity:
              'Assist (32): 08/15/19 hh:mm:ss pm<br/>' +
              'more...',
              playerProfile: 'Luca Modric',
              customers: 'Customer 5'
            },
            {
              id: 9,
              headshot: '',
              name: 'Cindy Baker',
              firstName: 'Cindy',
              lastName: 'Baker',
              teamsRolesGroups: [
                { id: 1, name: 'Team Three', type: 'Player'},
              ],
              appsPermissions: 'Whiteboard',
              status: 'Invited',
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
              status: 'Active',
              activity: 'Session Tr.(32): 08/15/19 hh:mm:ss pm<br/>' +
              'Assist (32): 08/15/19 hh:mm:ss pm<br/>',
              playerProfile: 'Jimmy Dockers',
              customers: 'Customer 15, Customer 22'
            },
            {
              id: 11,
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
              status: 'Active',
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
              status: 'Invited',
              activity: 'Session Tr.(32): 08/15/19 hh:mm:ss pm',
              playerProfile: 'Alex Morozenko',
              customers: 'Customer 4'
            },
            {
              id: 13,
              headshot: '',
              name: 'Alli Connors',
              firstName: 'Alli',
              lastName: 'Connors',
              teamsRolesGroups: [
                { id: 2, name: 'Team Two', type: 'Player'},
              ],
              appsPermissions: 'Team One: Session Tracker, Whiteboard',
              status: 'Invited',
              activity:
              'Assist (32): 08/15/19 hh:mm:ss pm<br/>' +
              'more...',
              playerProfile: 'Luca Modric',
              customers: 'Customer 5'
            },
            {
              id: 14,
              headshot: '',
              name: 'Cindy Baker',
              firstName: 'Cindy',
              lastName: 'Baker',
              teamsRolesGroups: [
                { id: 1, name: 'Team Three', type: 'Player'},
              ],
              appsPermissions: 'Whiteboard',
              status: 'Invited',
              activity: 'Session Tr.(33): 08/15/19 hh:mm:ss pm',
              playerProfile: 'Marcus Scott',
              customers: 'Customer 10'
            },
            {
              id: 15,
              headshot: '',
              name: 'Alex Soborsky',
              firstName: 'Alex',
              lastName: 'Soborsky',
              teamsRolesGroups: [
                { id: 1, name: 'Team One', type: 'Coach'},
                { id: 2, name: 'Team Two', type: 'Player'},
              ],
              appsPermissions: 'Team One: Whiteboard',
              status: 'Active',
              activity: 'Session Tr.(32): 08/15/19 hh:mm:ss pm<br/>' +
              'Assist (32): 08/15/19 hh:mm:ss pm<br/>',
              playerProfile: 'Jimmy Dockers',
              customers: 'Customer 15, Customer 22'
            },
          ]
        }, 2000)

        setTimeout( ()=> {
          this.loading = false
        }, 2000)

      },

    },
  }
</script>

<style scoped>
  .v-data-table__wrapper a:hover {
    text-decoration: underline;
  }
</style>
