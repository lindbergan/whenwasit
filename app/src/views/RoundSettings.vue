<template>
  <v-container fluid fill-height>
    <v-layout column wrap white--text align-center fill-height justify-center>
      <div style="display: flex; flex-direction: column; align-items: center;">
        <img width="75px" style="margin-bottom: 25px;" src="img/icons/icon.png">
        <h1 style="margin-bottom: 25px; text-align: center;">Rundor</h1>
        <v-select style="width: 120px; font-family: Open Sans, sans serif;" :items="rounds" color="black" :value="rounds[1]" solo/>
        <v-btn style="width: 100%; font-family: Open Sans;" round large to="/game">Fortsätt</v-btn>
      </div>
    </v-layout>
    <!--<v-layout column justify-space-around align-center>
        <v-list class="rounded">
          <v-list-tile v-for="category in categories" :key="category.id">
            <v-list-tile-content>
              <strong v-if="category.isSelected">
                <v-list-tile-title v-text="category.name"/>
              </strong>
              <v-list-tile-title v-else v-text="category.name"/>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon
                v-if="category.isSelected"
                @click="changeSelect(category.id)"
                color="red"
              >remove</v-icon>
              <v-icon v-else @click="changeSelect(category.id)" color="green">check</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list
        
    </v-layout>>-->
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
          isSelected: true
        },
        {
          name: "Katastrofer",
          id: 1,
          isSelected: true
        },
        {
          name: "Kända personer",
          id: 2,
          isSelected: false
        },
        {
          name: "Historiska händelser",
          id: 3,
          isSelected: false
        },
        {
          name: "Sportrelaterat",
          id: 4,
          isSelected: false
        }
      ]
    };
  },
  methods: {
    changeSelect(id) {
      this.categories[id].isSelected = !this.categories[id].isSelected;
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 35px;
  font-family: "Raleway", sans-serif;
  border-bottom: 4px solid #8c90a5;
}
.rounded {
  border-radius: 15px;
}
</style>


