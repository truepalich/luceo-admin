<template>
  <div>
    <Filters :data="dynamicCurrentData"></Filters>

    <!--:options.sync="options"-->
    <!--:server-items-length="totalCustomers"-->
    <!--:loading="loading"-->

    <v-data-table
      :headers="headers"
      :items="customers"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:item.name="{ item }">
        <a class="links--text" @click.prevent="showDialogAndTransferEvent(item, 'show-add-edit-dialog', $route.name, 'add-edit')">{{ item.name }}</a>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip @click.prevent="showDialogAndTransferEvent(item, 'show-status-dialog', $route.name)" :color="item.status == 'Active' ? 'green' : 'blue-grey darken-1'" dark>{{ item.status }}</v-chip>
      </template>
      <template v-slot:item.teams="{ item }">
        <div v-for="team in item.teams">
          <a class="links--text" @click.prevent="showDialogAndTransferEvent(team, 'show-coming-soon-dialog')">{{ team.name }}</a>
        </div>
      </template>
      <template v-slot:item.activeUsers="{ item }">
        <a class="links--text" @click.prevent="showDialogAndTransferEvent(item, 'show-active-users-dialog')">{{ item.activeUsers }}</a>
      </template>
      <template v-slot:item.adminUsers="{ item }">
        <a class="links--text" @click.prevent="showDialogAndTransferEvent(item, 'show-admin-users-dialog')">{{ item.adminUsers }}</a>
      </template>
      <template v-slot:item.hubspotCompany="{ item }">
        <a class="links--text" @click.prevent="showDialogAndTransferEvent(item, 'show-coming-soon-dialog')">{{ item.hubspotCompany }}</a>
      </template>
    </v-data-table>

    <AddEditDialog :data="dynamicCurrentData"></AddEditDialog>
    <StatusDialog :data="dynamicCurrentData"></StatusDialog>
    <ComingSoonDialog :data="dynamicCurrentData"></ComingSoonDialog>
    <ActiveUsersDialog :data="dynamicCurrentData"></ActiveUsersDialog>
    <AdminUsersDialog :data="dynamicCurrentData"></AdminUsersDialog>

  </div>
</template>

<script>
    import Filters from "../components/Filters";
    import AdminUsersDialog from "../components/customers/AdminUsersDialog";
    import ActiveUsersDialog from "../components/base/ActiveUsersDialog";
    import StatusDialog from "../components/base/StatusDialog";
    import ComingSoonDialog from "../components/base/ComingSoonDialog";
    import AddEditDialog from "../components/base/AddEditDialog";
    import {Mixin} from "../mixins/Mixin";

    export default {
      name: "Customers",
      mixins: [Mixin],
      components: {AddEditDialog, ComingSoonDialog, StatusDialog, ActiveUsersDialog, AdminUsersDialog, Filters},
      data: () => ({
        loading: true,
        options: {},
        customers: [],
        totalCustomers: 0,

        currentData: {
          itemData: {},
          dialogData: {
            entity: 'Customer',
            fields: [],
          },
          filterData: []
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

      computed: {
        dynamicCurrentData () {
          var currData = this.currentData;
          currData.dialogData.fields = [
            { key: "Name", type: "text-field", label: "Name", value: "", items: "", size: "" },
            { key: "HubSpotCompanyID", type: "text-field", label: "Hubspot Company Id", value: "", items: "", size: "" },
            { key: "RenewalDate", type: "date", label: "Renewal Date", value: "", items: "", size: "" }
          ];
          currData.filterData = [
            { key: "search", type: "text-field", label: "Search", value: "", items: "", size: "2" },
            { key: "status", type: "select", label: "Status", value: "", items: this.$store.getters.getCurrentFilterByKey('status'), size: "2" },
            { key: "actions", type: "action", size: "6" },
          ]
          return currData;
        }
      },

      created () {

      },

      // watch: {
      //   options: {
      //     handler () {
      //       this.getDataFromApi()
      //         .then(data => {
      //           this.customers = data.items
      //           this.totalCustomers = data.total
      //         })
      //     },
      //     deep: true,
      //   },
      // },
      // mounted () {
      //   this.getDataFromApi()
      //     .then(data => {
      //       this.customers = data.items
      //       this.totalCustomers = data.total
      //     })
      // },

      methods: {

        initialize () {
          setTimeout( ()=> {
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
              }
            ]
          }, 2000)

          setTimeout( ()=> {
            this.loading = false
          }, 2000)
        },

        // getDataFromApi () {
        //   this.loading = true
        //
        //   return new Promise((resolve, reject) => {
        //     const { sortBy, sortDesc, page, itemsPerPage } = this.options
        //
        //     let items = []
        //     this.axios.get('http://dev.itirra.com/luceo/admin/getCustomers.php')
        //         .then((response) => {
        //           // this.$store.commit('setCustomers', response.data)
        //           items = response.data
        //         })
        //         .catch(function (error) {
        //           // handle error
        //           console.log(error);
        //         })
        //     //
        //     const total = 10
        //
        //     // const total = items.length
        //
        //     if (sortBy.length === 1 && sortDesc.length === 1) {
        //       items = items.sort((a, b) => {
        //         const sortA = a[sortBy[0]]
        //         const sortB = b[sortBy[0]]
        //
        //         if (sortDesc[0]) {
        //           if (sortA < sortB) return 1
        //           if (sortA > sortB) return -1
        //           return 0
        //         } else {
        //           if (sortA < sortB) return -1
        //           if (sortA > sortB) return 1
        //           return 0
        //         }
        //       })
        //     }
        //
        //     if (itemsPerPage > 0) {
        //       items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        //     }
        //
        //     setTimeout(() => {
        //       this.loading = false
        //       resolve({
        //         items,
        //         total,
        //       })
        //     }, 4000)
        //   })
        // },

      }
    }
</script>

<style scoped>
  .v-data-table__wrapper a:hover {
    text-decoration: underline;
  }
</style>
