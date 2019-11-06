<template>
  <v-dialog v-model="dialogMembers" max-width="700px">
    <v-card>
      <v-card-title class="headline dialogHeader">
        <span class="headline">Add/Edit Members</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-col cols="12" sm="12">
            <b v-if="data.itemData.name">{{ data.itemData.name }} | Member</b>
          </v-col>
          <v-row>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Player 1 / Player"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Player 2 / Player"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Player 3 / Player"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Player 4 / Player"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Player 5 / Player"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  label="Player 6 / Player"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  v-model="checkbox3" label="Coach 1 / Coach"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  v-model="checkbox4" label="Coach 2 / Coach"></v-checkbox></v-col>
            <v-col cols="12" sm="4" class="py-0"><v-checkbox color="selectedColors"  v-model="checkbox5" label="Coach 3 / Coach"></v-checkbox></v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="dialogBut1" text @click="dialogMembers = false">Cancel</v-btn>
        <!--<v-btn color="dialogBut2" @click="dialogStatus = false">Save</v-btn>-->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "AddEditMembersDialog",
    props: ['data'],
    data: () => ({
      dialogMembers: false,

      checkbox3: true,
      checkbox4: true,
      checkbox5: true,
    }),
    created () {
      this.$eventHub.$on('show-add-edit-member-dialog', this.showDialog );
    },
    methods: {
      showDialog() {
        this.dialogMembers = true
      }
    }
  }
</script>

<style scoped>

</style>
