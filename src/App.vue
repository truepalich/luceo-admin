<template>
  <v-app>
    <v-app-bar
      app
      color="blue darken-1"
    >
      <v-toolbar-title><v-icon class="mr-1">mdi-view-dashboard</v-icon>Luceo Admin</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-avatar color="blue darken-2" class="mr-1">
        <v-icon>mdi-account-circle</v-icon>
      </v-avatar>
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" small>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>

      <v-tabs >
        <v-tab :to="{ name: 'Customers' }">Customers</v-tab>
        <v-tab :to="{ name: 'Teams' }">Teams</v-tab>
        <v-tab :to="{ name: 'Users' }">Users</v-tab>
        <v-tab :to="{ name: 'Groups' }">Groups</v-tab>
        <v-tab :to="{ name: 'Apps' }">Apps</v-tab>
      </v-tabs>

      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer color="blue darken-1">
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'app',
    created: function () {
      this.$vuetify.theme.dark = true
    }
  }
</script>

<style>

</style>
