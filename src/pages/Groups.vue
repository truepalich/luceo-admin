<template>
  <div>

    <Filters></Filters>

    <v-data-table
      :headers="headers"
      :items="groups"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:item.customer="{ item }">
        <a class="links--text" @click.prevent="showDialogAndTransferEvent(item, 'show-add-edit-dialog')">{{ item.customer }}</a>
      </template>
      <template v-slot:item.members="{ item }">
        <a class="links--text" @click.prevent="showDialogAndTransferEvent(item, 'show-add-edit-member-dialog')">{{ item.members }} - edit</a>
      </template>
    </v-data-table>

    <AddEditMembersDialog :data="currentData"></AddEditMembersDialog>
    <AddEditDialog :data="currentData"></AddEditDialog>

  </div>
</template>

<script>
    import Filters from "../components/Filters";
    import AddEditMembersDialog from "../components/groups/AddEditMembersDialog";
    import AddEditDialog from "../components/base/AddEditDialog";
    export default {
      name: "Groups",
      components: {AddEditDialog, AddEditMembersDialog, Filters},
      data: () => ({
        loading: true,

        currentData: {
          itemData: {},
          dialogData: {
            entity: 'Group',
            fields: [
              { type: 'combobox', label: 'Customer', value: '', items: ['Customer 1', 'Customer 2', 'Customer 3', 'Customer 4', 'Customer 5'], size: '' },
              { type: 'text-field', label: 'Name', value: 'Forward 1', size: '' },
            ],
          },
        },

        groups: [],

        headers: [
          { text: 'Name', value: 'name', sortable: false },
          { text: 'Customer', value: 'customer' },
          { text: 'Members', value: 'members' },
        ],

      }),
      created () {
        this.initialize()
      },
      methods: {
        showDialogAndTransferEvent (item, event, routeName) {
          item.routeName = routeName;
          this.currentData.itemData = item;
          this.$eventHub.$emit(event);
        },

        initialize() {
          setTimeout( ()=> {
            this.groups = [
              {
                id: 1,
                name: 'Forwards',
                customer: 'Customer 1',
                members: 3,
              },
              {
                id: 2,
                name: 'Forwards 2',
                customer: 'Customer 2',
                members: 3,
              },
              {
                id: 3,
                name: 'Forwards 3',
                customer: 'Customer 3',
                members: 3,
              },
              {
                id: 4,
                name: 'Forwards 4',
                customer: 'Customer 4',
                members: 3,
              },
              {
                id: 5,
                name: 'Forwards 5',
                customer: 'Customer 5',
                members: 3,
              },
              {
                id: 6,
                name: 'Forwards 6',
                customer: 'Customer 1',
                members: 3,
              },
              {
                id: 7,
                name: 'Forwards 7',
                customer: 'Customer 2',
                members: 3,
              },
              {
                id: 8,
                name: 'Forwards 8',
                customer: 'Customer 3',
                members: 3,
              },
              {
                id: 9,
                name: 'Forwards 9',
                customer: 'Customer 4',
                members: 3,
              },
              {
                id: 10,
                name: 'Forwards 10',
                customer: 'Customer 5',
                members: 3,
              },
            ]
          }, 2000)

          setTimeout( ()=> {
            this.loading = false
          }, 2000)

        },

      }
    }
</script>

<style scoped>

</style>
