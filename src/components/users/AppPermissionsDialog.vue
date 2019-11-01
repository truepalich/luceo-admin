<template>
  <v-dialog v-model="dialogAppsPermissions" max-width="1000px">
    <v-card>
      <v-card-title class="headline dialogHeader">
        <span class="headline">Apps & Permissions</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <b>{{ data.name }} | Apps & Permissions</b>
            </v-col>
            <v-col cols="12" sm="12">
              <b>Team One (Coach)</b>
            </v-col>

            <v-col cols="12" sm="3" class="align-center d-flex">
              Assist App Access:
            </v-col>
            <v-col cols="12" sm="1">
              <v-switch
                v-model="appsPermissionsSwitch1"
                color="selectedColors"
              ></v-switch>
            </v-col>
            <v-col cols="12" sm="2"><v-checkbox color="selectedColors"  label="Permission 1"></v-checkbox></v-col>
            <v-col cols="12" sm="2"><v-checkbox color="selectedColors"  label="Permission 2"></v-checkbox></v-col>
            <v-col cols="12" sm="2"><v-checkbox color="selectedColors"  label="Permission 3"></v-checkbox></v-col>
            <v-col cols="12" sm="2"><v-checkbox color="selectedColors"  label="Permission 4"></v-checkbox></v-col>


            <v-col cols="12" sm="3" class="align-center d-flex">
              Whiteboard App Access:
            </v-col>
            <v-col cols="12" sm="1">
              <v-switch
                v-model="appsPermissionsSwitch2"
                color="selectedColors"
              ></v-switch>
            </v-col>
            <v-col cols="12" sm="2"><v-checkbox color="selectedColors" label="Permission 1"></v-checkbox></v-col>
            <v-col cols="12" sm="2"><v-checkbox color="selectedColors"  label="Permission 2"></v-checkbox></v-col>
            <v-col cols="12" sm="2"><v-checkbox color="selectedColors"  label="Permission 3"></v-checkbox></v-col>
            <v-col cols="12" sm="2"><v-checkbox color="selectedColors"  label="Permission 4"></v-checkbox></v-col>


            <v-col cols="12" sm="3" class="align-center d-flex">
              GamePlan App Access:
            </v-col>
            <v-col cols="12" sm="1">
              <v-switch
                v-model="appsPermissionsSwitch3"
                color="selectedColors"
              ></v-switch>
            </v-col>
            <v-col cols="12" sm="2"><v-checkbox color="selectedColors"  label="Permission 1"></v-checkbox></v-col>
            <v-col cols="12" sm="2"><v-checkbox color="selectedColors"  label="Permission 2"></v-checkbox></v-col>
            <v-col cols="12" sm="2"><v-checkbox color="selectedColors"  label="Permission 3"></v-checkbox></v-col>
            <v-col cols="12" sm="2"><v-checkbox color="selectedColors"  label="Permission 4"></v-checkbox></v-col>


            <v-col cols="12" sm="3" class="align-center d-flex">
              Usage Reports App Access:
            </v-col>
            <v-col cols="12" sm="1">
              <v-switch
                v-model="appsPermissionsSwitch4"
                color="selectedColors"
              ></v-switch>
            </v-col>
            <v-col cols="12" sm="2"><v-checkbox color="selectedColors"  label="Permission 1"></v-checkbox></v-col>
            <v-col cols="12" sm="2"><v-checkbox color="selectedColors"  label="Permission 2"></v-checkbox></v-col>
            <v-col cols="12" sm="2"><v-checkbox color="selectedColors"  label="Permission 3"></v-checkbox></v-col>
            <v-col cols="12" sm="2"><v-checkbox color="selectedColors"  label="Permission 4"></v-checkbox></v-col>


          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="dialogBut1" text @click="dialogAppsPermissions = false">Cancel</v-btn>
        <v-btn color="dialogBut2" @click="dialogAppsPermissions = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "AppPermissionsDialog",
    props: ['data'],
    data: () => ({
      dialogAppsPermissions: false,

      appsPermissionsSwitch1: true,
      appsPermissionsSwitch2: true,
      appsPermissionsSwitch3: true,
      appsPermissionsSwitch4: true,

    }),
    created () {
      this.$eventHub.$on('show-app-permissions-dialog', this.showDialog );
    },
    methods: {
      showDialog() {
        this.dialogAppsPermissions = true
      }
    }
  }
</script>

<style scoped>

</style>
