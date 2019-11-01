<template>
  <v-dialog v-model="dialogActivity" max-width="500px">
    <v-card>
      <v-card-title class="headline dialogHeader">
        <span class="headline">Activity (2 weeks)</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <b v-if="data.name">{{ data.name}} | 2 Week Activity</b>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="activityApp"
                value="Assist"
                label="App"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" class="align-center d-flex justify-end">
              <b>Total: 34</b>
            </v-col>
            <v-col cols="12" sm="12">
              <v-simple-table>
                <thead>
                <tr>
                  <th class="text-left">App</th>
                  <th class="text-left">Date/Time</th>
                  <th class="text-left">Status</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in activityItems" :key="item.name">
                  <td>{{ item.app }}</td>
                  <td>{{ item.date}}</td>
                  <td>{{ item.status}}</td>
                </tr>
                </tbody>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="dialogBut1" text @click="dialogActivity = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "ActivityDialog",
    props: ['data'],
    data: () => ({
      dialogActivity: false,
      activityApp: ['Assist', 'Assist 2', 'Assist 3'],
      activityItems: [
        { id: 1, app: 'Assist', date: '08/15/19 hh:mm:ss pm', status: 'Success' },
        { id: 2, app: 'Assist', date: '08/15/19 hh:mm:ss pm', status: 'Success' },
        { id: 3, app: 'Assist', date: '08/15/19 hh:mm:ss pm', status: 'Success' },
        { id: 4, app: 'Assist', date: '08/15/19 hh:mm:ss pm', status: 'Success' },
        { id: 5, app: 'Assist', date: '08/15/19 hh:mm:ss pm', status: 'Success' },
        { id: 6, app: 'Assist', date: '08/15/19 hh:mm:ss pm', status: 'Success' },
        { id: 7, app: 'Assist', date: '08/15/19 hh:mm:ss pm', status: 'Success' },
      ],
    }),
    created () {
      this.$eventHub.$on('show-activity-dialog', this.showDialog );
    },
    methods: {
      showDialog() {
        this.dialogActivity = true
      }
    }
  }
</script>

<style scoped>

</style>
