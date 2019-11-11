<template>
  <v-card class="mb-4 filter-custom-box">
    <v-card-text class="pa-0">


      <v-row align="center" v-if="data.filterData.length > 0">
        <v-col cols="12" md="2">
          <div class="pl-4">
            <h1>{{ sectionName }}</h1>
          </div>
        </v-col>
        <v-col cols="12" :md="field.size ? field.size : '12'" :key="i" v-for="(field, i) in data.filterData" :class="field.type == 'action' ? 'align-center justify-end d-flex' : ''">
          <v-text-field append-icon="mdi-magnify" v-if="field.type == 'text-field'" :label="field.label" :value="field.value" single-line></v-text-field>
          <v-select v-else-if="field.type == 'select'" :label="field.label" :value="field.value" :items="field.items"></v-select>
          <div v-else-if="field.type == 'action'" class="pr-2">
            <v-btn v-if="$route.name === 'Users'" color="filterBut3" small class="ma-2 white--text ">Template</v-btn>
            <v-btn v-if="$route.name === 'Users'" color="filterBut2" class="ma-2 white--text ml-0" fab><v-icon>mdi-cloud-upload</v-icon></v-btn>
            <v-btn color="filterBut1" @click.prevent="showAddDialog()" class="ma-2 white--text ml-0" fab><v-icon>mdi-plus</v-icon></v-btn>
          </div>
        </v-col>

      </v-row>


    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "Filters",
    props: ['data'],
    data: () => ({

    }),
    created () {
      // console.log(this.$route)
    },
    computed: {
      sectionName() {
        return this.$route.name
      }
    },
    methods: {
      showAddDialog () {
        this.$eventHub.$emit('show-add-dialog');
      }
    }
  }
</script>

<style scoped>

</style>
