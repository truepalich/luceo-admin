<template>
  <v-dialog v-model="dialogStatus" max-width="500px">
    <v-card>
      <v-card-title class="headline dialogHeader">
        <span class="headline">Status</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <b v-if="data.name">{{ data.name }} | Status</b>
            </v-col>
            <v-col cols="12" sm="12" v-if="data.status">
              <b>Current status: <v-chip :color="data.status=='Active' ? 'green' : 'blue-grey darken-1'" dark>{{ data.status }}</v-chip></b>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="dialogBut1" text @click="dialogStatus = false">Cancel</v-btn>
        <!--<v-btn color="dialogBut2" @click="dialogStatus = false">Save</v-btn>-->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "StatusDialog",
    props: ['data'],
    data: () => ({
      dialogStatus: false,
    }),
    created () {
      this.$eventHub.$on('show-status-dialog', this.showDialog );
    },
    methods: {
      showDialog() {
        this.dialogStatus = true
      }
    }
  }
</script>

<style scoped>

</style>
