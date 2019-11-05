<template>
  <v-card class="mb-4 filter-custom-box">
    <v-card-text class="pa-0">

      <v-row align="center" v-if="$route.name === 'Customers'">
        <v-col cols="12" md="2">
          <div class="pl-4">
            <h1>{{sectionName}}</h1>
          </div>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            v-model="customersFilterSearch"
            append-icon="mdi-magnify"
            label="Search"
            single-line
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-select
            :items="customersFilterStatus"
            label="Status"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6" class="align-center justify-end d-flex">
          <div class="pr-2">
            <v-btn color="filterBut1" @click.prevent="showAddDialog()" class="ma-2 white--text" fab><v-icon>mdi-plus</v-icon></v-btn>
          </div>
        </v-col>
      </v-row>

      <v-row align="center" v-if="$route.name === 'Teams'">
        <v-col cols="12" md="2">
          <div class="pl-4">
            <h1>{{sectionName}}</h1>
          </div>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            v-model="teamsFilterSearch"
            append-icon="mdi-magnify"
            label="Search"
            single-line
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-select
            :items="teamsFilterCustomer"
            label="Customer"
          ></v-select>
        </v-col>
        <v-col cols="12" md="2">
          <v-select
            :items="teamsFilterLeague"
            label="League"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4" class="align-center justify-end d-flex">
          <div class="pr-2">
            <v-btn color="filterBut1" @click.prevent="showAddDialog()" class="ma-2 white--text" fab><v-icon>mdi-plus</v-icon></v-btn>
          </div>
        </v-col>
      </v-row>

      <v-row align="center" v-if="$route.name === 'Users'">
        <v-col cols="12" md="2">
          <div class="pl-4">
            <h1>{{sectionName}}</h1>
          </div>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            v-model="usersFilterSearch"
            append-icon="mdi-magnify"
            label="Search"
            single-line
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="1">
          <v-select
            :items="usersFilterSearchItems"
            label="Team"
          ></v-select>
        </v-col>
        <v-col cols="12" md="1">
          <v-select
            :items="usersFilterSearchItems"
            label="Status"
          ></v-select>
        </v-col>
        <v-col cols="12" md="1">
          <v-select
            :items="usersFilterSearchItems"
            label="Customer"
          ></v-select>
        </v-col>
        <v-col cols="12" md="1">
          <v-select
            :items="usersFilterSearchItems"
            label="Apps"
          ></v-select>
        </v-col>
        <v-col cols="12" md="1">
          <v-select
            :items="usersFilterSearchItems"
            label="Group"
          ></v-select>
        </v-col>
        <v-col cols="12" md="1">
          <v-select
            :items="usersFilterSearchItems"
            label="Role"
          ></v-select>
        </v-col>

        <v-col cols="12" md="2" class="align-center justify-end d-flex">
          <div class="pr-2">
            <v-btn color="filterBut3" small class="ma-2 white--text ">Template</v-btn>
            <v-btn color="filterBut2" class="ma-2 white--text ml-0" fab><v-icon>mdi-cloud-upload</v-icon></v-btn>
            <v-btn color="filterBut1" @click.prevent="showAddDialog()" class="ma-2 white--text ml-0" fab><v-icon>mdi-plus</v-icon></v-btn>
          </div>
        </v-col>
      </v-row>

      <v-row align="center" v-if="$route.name === 'Groups'">
        <v-col cols="12" md="2">
          <div class="pl-4">
            <h1>{{sectionName}}</h1>
          </div>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            v-model="groupsFilterSearch"
            append-icon="mdi-magnify"
            label="Search"
            single-line
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-select
            :items="groupsFilterSearchItems"
            label="Customer"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6" class="align-center justify-end d-flex">
          <div class="pr-2">
            <v-btn color="filterBut1" @click.prevent="showAddDialog()" class="ma-2 white--text" fab><v-icon>mdi-plus</v-icon></v-btn>
          </div>
        </v-col>
      </v-row>

      <v-row align="center" v-if="$route.name === 'Apps'">
        <v-col cols="12" md="2">
          <div class="pl-4">
            <h1>{{sectionName}}</h1>
          </div>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            v-model="appsFilterSearch"
            append-icon="mdi-magnify"
            label="Search"
            single-line
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-select
            :items="appsFilterSearchItems"
            label="Type/Platform"
          ></v-select>
        </v-col>
        <v-col cols="12" md="2">
          <v-select
            :items="appsFilterSearchItems"
            label="Enviroment"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4" class="align-center justify-end d-flex">
          <div class="pr-2">
            <v-btn color="filterBut1" @click.prevent="showAddDialog()" class="ma-2 white--text" fab><v-icon>mdi-plus</v-icon></v-btn>
          </div>
        </v-col>
      </v-row>


    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "Filters",
    data: () => ({
      customersFilterSearch: '',
      customersFilterStatus: ['Filter 1', 'Filter 2', 'Filter 3'],

      teamsFilterSearch: '',
      teamsFilterCustomer: ['Filter 1', 'Filter 2', 'Filter 3'],
      teamsFilterLeague: ['Filter 1', 'Filter 2', 'Filter 3'],

      usersFilterSearch: '',
      usersFilterSearchItems: ['Filter 1', 'Filter 2', 'Filter 3'],

      groupsFilterSearch: '',
      groupsFilterSearchItems: ['Filter 1', 'Filter 2', 'Filter 3'],

      appsFilterSearch: '',
      appsFilterSearchItems: ['Filter 1', 'Filter 2', 'Filter 3'],
    }),
    created () {
      // console.log(this.$route)
    },
    computed: {
      sectionName() {
        return this.$route.name
      }
    },
    methods: {
      showAddDialog () {
        this.$eventHub.$emit('show-add-dialog');
      }
    }
  }
</script>

<style scoped>

</style>
