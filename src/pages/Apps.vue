<template>
  <div>

    <Filters></Filters>

    <v-data-table
      :headers="headers"
      :items="apps"
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
      <template v-slot:item.customPermissions="{ item }">
        <a class="links--text" @click.prevent="showDialogAndTransferEvent(item, 'show-custom-permissions-dialog')">View/Edit</a>
      </template>
    </v-data-table>

    <ChangeLogoDialog :data="currentData"></ChangeLogoDialog>
    <CustomPermissionsDialog :data="currentData"></CustomPermissionsDialog>
    <AddEditDialog :data="currentData"></AddEditDialog>

  </div>
</template>

<script>
  import Filters from "../components/Filters";
  import ChangeLogoDialog from "../components/base/ChangeLogoDialog";
  import CustomPermissionsDialog from "../components/apps/CustomPermissionsDialog";
  import AddEditDialog from "../components/base/AddEditDialog";
  export default {
    name: "Apps",
    components: {AddEditDialog, CustomPermissionsDialog, ChangeLogoDialog, Filters},
    data: () => ({
      loading: true,

      currentData: {
        itemData: {},
        dialogData: {
          entity: 'App',
          fields: [
            { key: "Name", type: "text-field", label: "Name", value: "", items: "", size: "" },
            { key: "Type", type: "combobox", label: "Type", value: "", items: ['Type 1', 'Type 2'], size: "" },
            { key: "Platform", type: "combobox", label: "Platform", value: "", items: ['Platform 1', 'Platform 2'], size: "" },
            { key: "Enviroment", type: "combobox", label: "Enviroment", value: "", items: ['Enviroment 1', 'Enviroment 2'], size: "" },
            { key: "Url", type: "text-field", label: "URL", value: "", items: "", size: "" },
            { key: "AzureAppServiceName", type: "text-field", label: "Azure App Service Name", value: "", items: "", size: "" },
          ],
        },
      },

      apps: [],

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
      showDialogAndTransferEvent (item, event, routeName, action) {
        if (action == 'add-edit') {
          this.getAddEditData()
        }
        item.routeName = routeName;
        this.currentData.itemData = item;
        this.$eventHub.$emit(event);
      },

      getAddEditData () {
        this.axios.get('http://dev.itirra.com/luceo/admin/getApp.php')
          .then((response) => {

            this.currentData.dialogData.fields.forEach(function(field) {
              for (let [key, value] of Object.entries(response.data)) {
                if (field.key == key) {
                  field.value = value
                }
              }
            });

          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      },

      initialize() {
        setTimeout( ()=> {
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
        }, 2000)


        setTimeout( ()=> {
          this.loading = false
        }, 2000)

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
