<template>
  <v-dialog v-model="dialogComingSoon" max-width="500px">
    <v-card>
      <v-card-title class="headline dialogHeader">
        <span class="headline" v-if="data.name">{{ data.name }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              Coming soon...
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="dialogBut1" text @click="dialogComingSoon = false">Cancel</v-btn>
        <!--<v-btn color="dialogBut2" @click="dialogStatus = false">Save</v-btn>-->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "ComingSoonDialog",
    props: ['data'],
    data: () => ({
      dialogComingSoon: false,
    }),
    created () {
      this.$eventHub.$on('show-coming-soon-dialog', this.showDialog );
    },
    methods: {
      showDialog() {
        this.dialogComingSoon = true
      }
    }
  }
</script>

<style scoped>

</style>
