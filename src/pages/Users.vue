<template>
  <div>

    <Filters></Filters>

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
        <a class="links--text" @click.prevent="showDialogAndTransferEvent(item, 'show-add-edit-dialog')">{{ item.name }}</a>
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

    <ComingSoonDialog :data="currentUserData"></ComingSoonDialog>
    <ChangeLogoDialog :data="currentUserData"></ChangeLogoDialog>
    <ActivityDialog :data="currentUserData"></ActivityDialog>
    <StatusDialog :data="currentUserData"></StatusDialog>
    <AppPermissionsDialog :data="currentUserData"></AppPermissionsDialog>
    <TeamsRolesGroupsDialog :data="currentUserData"></TeamsRolesGroupsDialog>
    <AddEditDialog :data="currentUserData"></AddEditDialog>

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
  import AddEditDialog from "../components/users/AddEditDialog";
  export default {
    name: "Users",
    components: {
      AddEditDialog,
      TeamsRolesGroupsDialog,
      AppPermissionsDialog, StatusDialog, ActivityDialog, ChangeLogoDialog, Filters, ComingSoonDialog},
    data: () => ({
      loading: true,
      currentUserData: {},

      users: [],

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

    created () {
      this.initialize()
    },

    methods: {
      showDialogAndTransferEvent (item, event, routeName) {
        item.routeName = routeName;
        this.currentUserData = item;
        this.$eventHub.$emit(event);
      },

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
