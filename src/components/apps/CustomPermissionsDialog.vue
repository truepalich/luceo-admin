<template>
  <v-dialog v-model="dialogCustomPermissions" max-width="600px">
    <v-card>
      <v-card-title class="headline dialogHeader">
        <span class="headline">Custom Permissions: {{ data.name }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>

            <v-col cols="12" sm="12">

              <v-simple-table>
                <thead>
                <tr>
                  <th class="text-left">Label</th>
                  <th class="text-left">Description</th>
                  <th class="text-left">InternalKey</th>
                  <th class="text-left"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in permissionList" :key="item.name">
                  <td>{{ item.label }}</td>
                  <td>{{ item.description }}</td>
                  <td>{{ item.internalKey }}</td>
                  <td>
                    <v-btn icon>
                      <v-icon color="selectedColors">mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
                </tbody>
              </v-simple-table>

            </v-col>

            <v-col cols="12" sm="12">
              <v-text-field label="Label"></v-text-field>
              <v-text-field label="Description"></v-text-field>
              <v-text-field label="InternalKey"></v-text-field>
              <v-btn color="dialogBut4">Add</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="dialogBut1" text @click="dialogCustomPermissions = false">Cancel</v-btn>
        <v-btn color="dialogBut2" @click="dialogCustomPermissions = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "CustomPermissionsDialog",
    props: ['data'],
    data: () => ({
      dialogCustomPermissions: false,

      permissionList: [
        { id: 1, label: 'Permission 1', description: 'Lorem ipsum', internalKey: 'PERMISSION_1' },
        { id: 2, label: 'Permission 2', description: 'Lorem ipsum', internalKey: 'PERMISSION_2' },
        { id: 3, label: 'Permission 3', description: 'Lorem ipsum', internalKey: 'PERMISSION_3' },
      ],

    }),
    created () {
      this.$eventHub.$on('show-custom-permissions-dialog', this.showDialog );
    },
    methods: {
      showDialog() {
        this.dialogCustomPermissions = true
      }
    }
  }
</script>

<style scoped>

</style>
