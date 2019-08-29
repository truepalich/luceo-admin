<template>
  <v-app>
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-toolbar-title>Luceo Admin</v-toolbar-title>
    </v-app-bar>

    <v-content>

      <v-tabs color="" background-color="indigo lighten-5">
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

    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
/*body {*/
  /*margin: 0;*/
/*}*/

/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*color: #2c3e50;*/
/*}*/

/*main {*/
  /*text-align: center;*/
  /*margin-top: 40px;*/
/*}*/

/*header {*/
  /*margin: 0;*/
  /*height: 56px;*/
  /*padding: 0 16px 0 24px;*/
  /*background-color: #35495E;*/
  /*color: #ffffff;*/
/*}*/

/*header span {*/
  /*display: block;*/
  /*position: relative;*/
  /*font-size: 20px;*/
  /*line-height: 1;*/
  /*letter-spacing: .02em;*/
  /*font-weight: 400;*/
  /*box-sizing: border-box;*/
  /*padding-top: 16px;*/
/*}*/
</style>
