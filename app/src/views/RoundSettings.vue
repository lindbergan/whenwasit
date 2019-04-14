<template>
  <v-container fluid fill-height>
    <v-toolbar app dark color="#594939">
      <v-toolbar-title>Inställningar</v-toolbar-title>
    </v-toolbar>
    <v-layout column wrap white--text align-center justify-space-around>
      <h1>Antal rundor</h1>
      <h1>Kategorier</h1>
      <v-list>
        <v-list-tile v-for="category in categories" :key="category.id">
          <v-list-tile-content>
            <v-list-tile-title v-text="category.name"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon v-if="category.selected" color="red">remove</v-icon>
            <v-icon v-else color="green">check</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-btn round large>Fortsätt</v-btn>
    </v-layout>
  </v-container>
</template>
<style scoped>
#v-toolbar {
  background-color: #594939;
}
</style>
<script>
export default {
  data() {
    return {
      categories: [
        {
          name: "Kända svenska personer",
          id: 1,
          selected: true
        },
        {
          name: "Katastrofer",
          id: 2,
          selected: true
        },
        {
          name: "Kända personer",
          id: 3,
          selected: false
        }
      ]
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 35px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-weight: 900;
}
</style>


