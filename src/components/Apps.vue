<template>
    <div>
      <v-card color="white" class="mb-4 filter-custom-box">
        <v-card-text class="pa-0">
          <v-row align="center">
            <v-col cols="12" md="2">
              <div class="pl-4">
                <h1>Apps</h1>
              </div>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                :items="filterSearchItems"
                label="Type/Platform"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                :items="filterSearchItems"
                label="Enviroment"
              ></v-select>
            </v-col>
            <v-col cols="12" md="4" class="align-center justify-end d-flex">
              <div class="pr-2">
                <v-btn color="orange" @click="" class="ma-2 white--text" fab><v-icon>mdi-plus</v-icon></v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <p>Coming soon...</p>
    </div>
</template>

<script>
    export default {
      name: "Apps",
      data: () => ({
        search: '',
        filterSearchItems: ['Filter 1', 'Filter 2', 'Filter 3'],
      })
    }
</script>

<style scoped>

</style>
