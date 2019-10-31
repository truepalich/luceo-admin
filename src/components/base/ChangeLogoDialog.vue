<template>
  <v-dialog v-model="dialogAvatar" max-width="500px">
    <v-card>
      <v-card-title class="headline dialogHeader">
        <span class="headline">Change logo</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <b v-if="data.name">{{ data.name }}</b>
            </v-col>
            <v-col cols="12" sm="12">
              <v-file-input
                label="Upload avatar"
                prepend-icon="mdi-camera"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="dialogBut1" text @click="dialogAvatar = false">Cancel</v-btn>
        <v-btn color="dialogBut2" @click="dialogAvatar = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "ChangeLogoDialog",
    props: ['data'],
    data: () => ({
      dialogAvatar: false,
    }),
    created () {
      this.$eventHub.$on('show-change-logo-dialog', this.showDialog);
    },
    methods: {
      showDialog() {
        this.dialogAvatar = true
      }
    }
  }
</script>

<style scoped>

</style>
