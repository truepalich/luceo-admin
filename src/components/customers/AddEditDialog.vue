<template>
  <v-dialog v-model="dialogCustomer" max-width="500px">
    <v-card>
      <v-card-title class="headline dialogHeader">
        <span class="headline" v-if="data.name">Edit Customer: {{ data.name }}</span>
        <span class="headline" v-else>Add Customer</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field label="Name" :value="data.name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field label="Hubspot Company Id"></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="Renewal Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable  color="selectedColors" >
                  <div class="flex-grow-1"></div>
                  <v-btn text color="blue darken-1" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>

          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="dialogBut1" text @click="dialogCustomer = false">Cancel</v-btn>
        <v-btn color="dialogBut2" @click="dialogCustomer = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "AddEditDialog",
    props: ['data'],
    data: () => ({
      dialogCustomer: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
    }),
    created () {
      this.$eventHub.$on('show-add-dialog-customer', this.showEmptyDataDialog );
      this.$eventHub.$on('show-add-edit-dialog', this.showDialog );
    },
    methods: {
      showDialog() {
        this.dialogCustomer = true
      },
      showEmptyDataDialog () {
        this.data = {}
        this.dialogCustomer = true
      }
    }
  }
</script>

<style scoped>

</style>
