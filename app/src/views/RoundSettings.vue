<template>
  <v-container fluid fill-height>
    <v-toolbar app dark color="#594939">
      <v-toolbar-title>Inställningar</v-toolbar-title>
    </v-toolbar>
    <v-layout column wrap white--text justify-space-around align-center>
      <v-layout column wrap justify-space-between>
        <h1>Antal rundor</h1>
        <v-select :items="rounds" dark :value="rounds[1]"/>
      </v-layout>
      <v-layout column justify-space-around align-center>
        <h1>Kategorier</h1>
        <v-list>
          <v-list-tile v-for="category in categories" :key="category.id">
            <v-list-tile-content>
              <v-list-tile-title v-text="category.name"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon
                v-if="category.isPlaying"
                @click="changeSelect(category.id)"
                color="red"
              >remove</v-icon>
              <v-icon v-else @click="changeSelect(category.id)" color="green">check</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-btn round large to="/game">Fortsätt</v-btn>
      </v-layout>
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
      rounds: [5, 10, 15, 20],
      categories: [
        {
          name: "Kända svenska personer",
          id: 0,
          isPlaying: true
        },
        {
          name: "Katastrofer",
          id: 1,
          isPlaying: true
        },
        {
          name: "Kända personer",
          id: 2,
          isPlaying: false
        },
        {
          name: "Historiska händelser",
          id: 3,
          isPlaying: false
        },
        {
          name: "Sportrelaterat",
          id: 4,
          isPlaying: false
        }
      ]
    };
  },
  methods: {
    changeSelect(id) {
      this.categories[id].isPlaying = !this.categories[id].isPlaying;
    }
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


