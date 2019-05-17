<template>
  <v-container fluid fill-height>
    <v-layout column wrap white--text align-center justify-space-around>
      <div style="display: flex; flex-direction: column; align-items: center;">
        <img width="75px" style="margin-bottom: 25px;" src="img/icons/icon.png">
        <h1 style="margin-bottom: 25px; text-align: center; max-width: 150px; ">Välj lag</h1>
        <v-list class="rounded">
          <v-list-tile v-for="team in getAllTeams" :key="team.index">
            <v-list-tile-content>
              <v-list-tile-title style="font-family: Open Sans, sans-serif;" v-text="team.name"></v-list-tile-title>
            </v-list-tile-content>
            <!--<v-list-tile-action>
              <v-icon color="blue">edit</v-icon>
            </v-list-tile-action>-->
            <v-list-tile-action>
              <v-icon v-if="team.isPlaying" color="red" @click="renderTeams(team.index)">remove</v-icon>
              <v-icon v-else color="green" @click="renderTeams(team.index)">check</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-btn style="margin-top: 35px; width: 100%; font-family: Open Sans" round large to="/roundsettings">Fortsätt</v-btn>
      </div>
      <!--<h3>Lägg till lag</h3>
      <v-card class="rounded">
        <v-card-text>
          <v-layout>
            <input type="text" placeholder="Namn på laget" v-model="textfield" class="rounded">
            <v-card-actions>
              <v-icon @click="clickedOnAdd">save</v-icon>
            </v-card-actions>
          </v-layout>
        </v-card-text>
      </v-card>-->
    </v-layout>
  </v-container>
</template>
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
  font-family: "Raleway", sans-serif;
  border-bottom: 4px solid #8c90a5;
}
input {
  border: 1px solid rgb(151, 125, 125);
  text-align: center;
}
.rounded {
  border-radius: 15px;
}
</style>


