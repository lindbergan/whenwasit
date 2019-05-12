<template>
  <v-container fluid fill-height>
    <v-toolbar app dark color="#594939">
      <v-toolbar-title>Inställningar</v-toolbar-title>
    </v-toolbar>
    <v-layout column wrap white--text align-center justify-space-around>
      <h1>Antal lag</h1>
      <v-list>
        <v-list-tile v-for="team in getAllTeams" :key="team.index">
          <v-list-tile-content>
            <v-list-tile-title v-text="team.name"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon color="blue">edit</v-icon>
          </v-list-tile-action>
          <v-list-tile-action>
            <v-icon v-if="team.selected" color="red" @click="renderTeams(team.index)">remove</v-icon>
            <v-icon v-else color="green" @click="renderTeams(team.index)">check</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <h2>Lägg till lag</h2>
      <v-card>
        <v-card-text>
          <v-layout>
            <input type="text" placeholder="Namn på laget" v-model="textfield">
            <v-card-actions>
              <v-icon @click="clickedOnAdd">save</v-icon>
            </v-card-actions>
          </v-layout>
        </v-card-text>
      </v-card>
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
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      textfield: ""
    };
  },
  computed: {
    ...mapGetters(["getAllTeams"])
  },
  methods: {
    ...mapActions(["selectTeam", "initGame", "addTeam"]),
    renderTeams(index) {
      this.selectTeam(index);
    },
    clickedOnAdd() {
      this.addTeam(this.textfield);
      this.textfield = "";
    }
  },
  created() {
    this.initGame();
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
input {
  border: 1px solid rgb(151, 125, 125);
  text-align: center;
}
</style>


