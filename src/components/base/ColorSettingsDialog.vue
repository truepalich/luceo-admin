<template>
  <v-dialog v-model="dialogColorSettings" max-width="600px">
    <v-card>
      <v-card-title class="headline dialogHeader">
        <span class="headline">Color settings</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <b v-if="data.itemData.name">{{ data.itemData.name }} | Color settings</b>
            </v-col>
            <v-col cols="12" sm="6">
              <b>Primary:</b>
              <v-color-picker light hide-canvas mode="hexa"></v-color-picker>
            </v-col>
            <v-col cols="12" sm="6">
              <b>Primary (Dark):</b>
              <v-color-picker light hide-canvas mode="hexa"></v-color-picker>
            </v-col>
            <v-col cols="12" sm="6">
              <b>Secondary:</b>
              <v-color-picker light hide-canvas mode="hexa"></v-color-picker>
            </v-col>
            <v-col cols="12" sm="6">
              <b>Tertiary:</b>
              <v-color-picker light hide-canvas mode="hexa"></v-color-picker>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="dialogBut1" text @click="dialogColorSettings = false">Cancel</v-btn>
        <v-btn color="dialogBut2" @click="dialogColorSettings = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "ColorSettingsDialog",
    props: ['data'],
    data: () => ({
      dialogColorSettings: false,
    }),
    created () {
      this.$eventHub.$on('show-color-settings-dialog', this.showDialog );
    },
    methods: {
      showDialog() {
        this.dialogColorSettings = true
      }
    }
  }
</script>

<style scoped>

</style>
