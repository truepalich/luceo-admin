<template>
  <v-dialog v-model="dialogAddEdit" max-width="500px">

    <LoadingInDialog v-show="loading"></LoadingInDialog>

    <v-card v-show="dialogContent">
      <v-card-title class="headline dialogHeader">
        <span class="headline" v-if="data.dialogData.entity">{{ addDialogView ? 'Add ' + data.dialogData.entity : 'Edit ' + data.dialogData.entity + ': ' + data.itemData.name }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row v-if="data.dialogData.fields.length > 0">
            <v-col cols="12" :sm="field.size ? field.size : '12'" :key="i" v-for="(field, i) in data.dialogData.fields">

              <component v-if="field.type == 'text-field' || field.type == 'combobox' || field.type == 'select'" :is="'v-' + field.type" :label="field.label" :value="addDialogView ? '' : field.value" :items="field.items"></component>

              <div v-if="field.type == 'text-html'">{{ field.label }}</div>
              <v-btn v-if="field.type == 'button'" block color="dialogBut3">{{ field.label }}</v-btn>
              <v-menu v-if="field.type == 'date'"
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="field.value"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :value="addDialogView ? '' : field.value"
                    :label="field.label"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker :value="field.value" no-title scrollable  color="selectedColors" >
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
        <v-btn color="dialogBut1" text @click="dialogAddEdit = false">Cancel</v-btn>
        <v-btn color="dialogBut2" @click="dialogAddEdit = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {PreloaderInDialog} from "../../mixins/PreloaderInDialog";
  import LoadingInDialog from "../LoadingInDialog";

  export default {
    name: "AddEditDialog",
    components: {LoadingInDialog},
    props: ['data'],
    mixins: [PreloaderInDialog],
    // watch: {
    //   data: function(newVal, oldVal) { // watch it
    //     // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    //   }
    // },
    data: () => ({
      dialogAddEdit: false,
      addDialogView: false,
      menu: false,
    }),
    created () {
      this.$eventHub.$on('show-add-edit-dialog', this.showDialog );
      this.$eventHub.$on('show-add-dialog', this.showDialogAdd );
    },
    methods: {
      showDialog() {
        this.addDialogView = false
        this.dialogAddEdit = true
      },
      showDialogAdd() {
        this.addDialogView = true
        this.dialogAddEdit = true
      },
    }
  }
</script>

<style scoped>

</style>
