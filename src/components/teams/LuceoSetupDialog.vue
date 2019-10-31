<template>
  <v-dialog v-model="dialogLuceoSetup" max-width="500px">
    <v-card>
      <v-card-title class="headline dialogHeader">
        <span class="headline">Luceo Setup</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <b v-if="data.name">{{ data.name }} | Luceo Setup</b>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field label="AAD Group ID"></v-text-field>
              <v-text-field label="Container"></v-text-field>
              <v-text-field label="File Name"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="dialogBut1" text @click="dialogLuceoSetup = false">Cancel</v-btn>
        <v-btn color="dialogBut2" @click="dialogLuceoSetup = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "LuceoSetupDialog",
    props: ['data'],
    data: () => ({
      dialogLuceoSetup: false,
    }),
    created () {
      this.$eventHub.$on('show-luceo-setup-dialog', this.showDialog );
    },
    methods: {
      showDialog() {
        this.dialogLuceoSetup = true
      }
    }
  }
</script>

<style scoped>

</style>
