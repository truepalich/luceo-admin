<template>
  <v-dialog v-model="dialogAdminUsers" max-width="700px">
    <v-card>
      <v-card-title class="headline dialogHeader">
        <span class="headline">Admin Users</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <b v-if="data.itemData.name">{{ data.itemData.name }} | Admin Users</b>
            </v-col>
            <v-col cols="12" sm="12" class="py-0"><v-checkbox color="selectedColors" label="Player 1 / Player"></v-checkbox></v-col>
            <v-col cols="12" sm="12" class="py-0"><v-checkbox color="selectedColors"  label="Player 2 / Player"></v-checkbox></v-col>
            <v-col cols="12" sm="12" class="py-0"><v-checkbox color="selectedColors"  label="Player 3 / Player"></v-checkbox></v-col>
            <v-col cols="12" sm="12" class="py-0"><v-checkbox color="selectedColors"  label="Player 4 / Player"></v-checkbox></v-col>

            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  v-model="checkbox1" label="Coach 1 / Coach"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Admin App 1"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Admin App 2"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  v-model="checkbox2" label="Coach 2 / Coach"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Admin App 1"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Admin App 2"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Coach 3 / Coach"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Admin App 1"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Admin App 2"></v-checkbox></v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="dialogBut1" text @click="dialogAdminUsers = false">Cancel</v-btn>
        <!--<v-btn color="dialogBut2" @click="dialogStatus = false">Save</v-btn>-->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "AdminUsersDialog",
    props: ['data'],
    data: () => ({
      dialogAdminUsers: false,
      checkbox1: true,
      checkbox2: true,
    }),
    created () {
      this.$eventHub.$on('show-admin-users-dialog', this.showDialog );
    },
    methods: {
      showDialog() {
        this.dialogAdminUsers = true
      }
    }
  }
</script>

<style scoped>

</style>
