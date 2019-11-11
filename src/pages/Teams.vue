<template>
  <div>

    <Filters :data="dynamicCurrentData"></Filters>

    <v-data-table
      :headers="headers"
      :items="teams"
      :loading="loading"
      class="elevation-1"
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
      <template v-slot:item.activeUsers="{ item }">
        <a class="links--text" @click.prevent="showDialogAndTransferEvent(item, 'show-active-users-dialog')">{{ item.activeUsers }}</a>
      </template>
      <template v-slot:item.customLocations="{ item }">
        <a class="links--text" @click.prevent="showDialogAndTransferEvent(item, 'show-custom-locations-dialog')">View ({{ item.customLocations }})</a>
      </template>
      <template v-slot:item.colorSettings="{ item }">
        <a class="links--text" @click.prevent="showDialogAndTransferEvent(item, 'show-color-settings-dialog')">XXX Setup</a>
      </template>
      <template v-slot:item.teamProfile="{ item }">
        <a class="links--text" @click.prevent="showDialogAndTransferEvent(item, 'show-coming-soon-dialog')">View</a>
      </template>
      <template v-slot:item.luceoSetup="{ item }">
        <a class="links--text" @click.prevent="showDialogAndTransferEvent(item, 'show-luceo-setup-dialog')">Setup/View</a>
      </template>
      <template v-slot:item.customer="{ item }">
        <a class="links--text" @click.prevent="showDialogAndTransferEvent(item, 'show-coming-soon-dialog')">{{ item.customer }}</a>
      </template>
    </v-data-table>

    <ComingSoonDialog :data="dynamicCurrentData"></ComingSoonDialog>
    <LuceoSetupDialog :data="dynamicCurrentData"></LuceoSetupDialog>
    <ColorSettingsDialog :data="dynamicCurrentData"></ColorSettingsDialog>
    <CustomLocationsDialog :data="dynamicCurrentData"></CustomLocationsDialog>
    <ChangeLogoDialog :data="dynamicCurrentData"></ChangeLogoDialog>
    <ActiveUsersDialog :data="dynamicCurrentData"></ActiveUsersDialog>
    <AddEditDialog :data="dynamicCurrentData"></AddEditDialog>

  </div>
</template>

<script>
    import Filters from "../components/Filters";
    import ComingSoonDialog from "../components/base/ComingSoonDialog";
    import LuceoSetupDialog from "../components/teams/LuceoSetupDialog";
    import ColorSettingsDialog from "../components/base/ColorSettingsDialog";
    import CustomLocationsDialog from "../components/teams/CustomLocationsDialog";
    import ChangeLogoDialog from "../components/base/ChangeLogoDialog";
    import ActiveUsersDialog from "../components/base/ActiveUsersDialog";
    import AddEditDialog from "../components/base/AddEditDialog";
    import {Mixin} from "../mixins/Mixin";

    export default {
      name: "Teams",
      mixins: [Mixin],
      components: {
        AddEditDialog, ActiveUsersDialog, ChangeLogoDialog, CustomLocationsDialog, ColorSettingsDialog, LuceoSetupDialog,
        ComingSoonDialog, Filters},
      data: () => ({
        loading: true,

        teams: [],

        currentData: {
          itemData: {},
          dialogData: {
            entity: 'Team',
            fields: [],
          },
          filterData: []
        },

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

      computed: {
        dynamicCurrentData () {
          var currData = this.currentData;
          currData.dialogData.fields = [
            { key: "CustomerID", type: "combobox", label: "Customer", value: "", items: this.$store.getters.getCurrentRelationByKey('customers') },
            { key: "TeamName", type: "text-field", label: "Name", value: "", items: "" },
            { key: "TeamProfile", type: "combobox", label: "Team Profile", value: "", items: this.$store.getters.getCurrentRelationByKey('teamProfiles') }
          ];
          currData.filterData = [
            { key: "search", type: "text-field", label: "Search", value: "", items: "", size: "2" },
            { key: "customers", type: "select", label: "Customer", value: "", items: this.$store.getters.getCurrentFilterByKey('customers'), size: "2" },
            { key: "leagues", type: "select", label: "League", value: "", items: this.$store.getters.getCurrentFilterByKey('leagues'), size: "2" },
            { key: "actions", type: "action", size: "4" },
          ]
          return currData;
        }
      },

      created () {

      },

      methods: {

        initialize () {
          setTimeout( ()=> {
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
          }, 2000)

          setTimeout( ()=> {
            this.loading = false
          }, 2000)
        },
      }
    }
</script>

<style scoped>

</style>
