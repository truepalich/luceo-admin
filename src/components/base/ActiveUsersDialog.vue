<template>
  <v-dialog v-model="dialogActiveUsers" max-width="700px">
    <v-card>
      <v-card-title class="headline dialogHeader">
        <span class="headline">Active Users</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <b v-if="data.name">{{ data.name }} | Active Users</b>
            </v-col>
            <v-col cols="12" sm="12" class="py-0"><v-checkbox color="selectedColors" label="Player 1 / Player"></v-checkbox></v-col>
            <v-col cols="12" sm="12" class="py-0"><v-checkbox color="selectedColors" label="Player 2 / Player"></v-checkbox></v-col>
            <v-col cols="12" sm="12" class="py-0"><v-checkbox color="selectedColors" label="Player 3 / Player"></v-checkbox></v-col>
            <v-col cols="12" sm="12" class="py-0"><v-checkbox v-model="checkbox5" color="selectedColors" label="Player 4 / Player"></v-checkbox></v-col>

            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors" v-model="checkbox3" label="Coach 1 / Coach"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors" label="Admin App 1"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors" label="Admin App 2"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors" v-model="checkbox4" label="Coach 2 / Coach"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors" label="Admin App 1"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors" label="Admin App 2"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors" label="Coach 3 / Coach"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors" label="Admin App 1"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors" label="Admin App 2"></v-checkbox></v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="dialogBut1" text @click="dialogActiveUsers = false">Cancel</v-btn>
        <!--<v-btn color="dialogBut2" @click="dialogStatus = false">Save</v-btn>-->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "ActiveUsersDialog",
    props: ['data'],
    data: () => ({
      dialogActiveUsers: false,
      checkbox3: true,
      checkbox4: true,
      checkbox5: true,
    }),
    created () {
      this.$eventHub.$on('show-active-users-dialog', this.showDialog );
    },
    methods: {
      showDialog() {
        this.dialogActiveUsers = true
      }
    }
  }
</script>

<style scoped>

</style>
