<template>
  <v-container fluid fill-height>
    <v-toolbar app dark color="#594939">
      <v-toolbar-title>Inställningar</v-toolbar-title>
    </v-toolbar>
    <v-layout column wrap white--text align-center justify-space-around>
      <h1>Antal lag</h1>
      <v-list>
        <v-list-tile v-for="team in teams" :key="team.id">
          <v-list-tile-content>
            <v-list-tile-title v-text="team.name"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon color="blue">edit</v-icon>
          </v-list-tile-action>
          <v-list-tile-action>
            <v-icon v-if="team.selected" color="red">remove</v-icon>
            <v-icon v-else color="green">check</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-btn round large to="/roundsettings">Fortsätt</v-btn>
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
      teams: [
        {
          name: "Crazy Cowboys",
          id: 1,
          selected: true
        },
        {
          name: "Mad Chicas",
          id: 2,
          selected: true
        },
        {
          name: "Cool Guys",
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


