<template>
  <v-dialog v-model="dialogCustomLocations" max-width="500px">
    <v-card>
      <v-card-title class="headline dialogHeader">
        <span class="headline" v-if="data.itemData.name">Locations: {{ data.name }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <b v-if="data.itemData.name">{{ data.itemData.name }} | Locations</b>
            </v-col>

            <v-col cols="12" sm="12">
              <v-list style="border-top: 1px solid #ccc">
                <v-list-item
                  v-for="item in locations"
                  :key="item.title"
                  style="border-bottom: 1px solid #ccc"
                  v-if="locations"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.address"></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon color="selectedColors">mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>

                </v-list-item>
              </v-list>
            </v-col>

            <v-col cols="12" sm="12">
              <p><b>Add new custom location:</b></p>
              <v-text-field label="Name"></v-text-field>
              <v-text-field label="Address"></v-text-field>
              <v-btn color="dialogBut4">Add</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="dialogBut1" text @click="dialogCustomLocations = false">Cancel</v-btn>
        <v-btn color="dialogBut2" @click="dialogCustomLocations = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "CustomLocationsDialog",
    props: ['data'],
    data: () => ({
      dialogCustomLocations: false,

      locations: [
        { title: 'Location name1', address: 'Acorn Street, Boston, MA, USA1' },
        { title: 'Location name2', address: 'Acorn Street, Boston, MA, USA2' },
        { title: 'Location name3', address: 'Acorn Street, Boston, MA, USA3' }
      ],
    }),
    created () {
      this.$eventHub.$on('show-custom-locations-dialog', this.showDialog );
    },
    methods: {
      showDialog() {
        this.dialogCustomLocations = true
      }
    }
  }
</script>

<style scoped>

</style>
