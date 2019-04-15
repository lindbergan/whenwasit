<template>
  <v-container fluid>
    <v-icon color="maroon" style="transform:scale(4)" id="arrow">arrow_right_alt</v-icon>
    <v-layout id="questions" row wrap justify-space-around>
      <v-card
        v-for="item in activeQuestions"
        :key="item.id"
        width="250"
        height="200"
        style="margin-bottom: 15px; border: 3px solid lightgreen;"
      >
        <v-card-title primary-title>
          <h3>{{ item.category }}</h3>
        </v-card-title>
        <v-card-text>
          <span>{{ item.title }}</span>
          <v-divider light></v-divider>
          <v-layout justify-center>
            <h2>
              <strong>År {{ item.year }}</strong>
            </h2>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-card
        v-for="item in inactiveQuestions"
        :key="item.id"
        width="250"
        height="200"
        style="margin-bottom: 15px; border: 3px solid maroon;"
      >
        <v-card-title primary-title>
          <h3>{{ item.category }}</h3>
        </v-card-title>
        <v-card-text>
          <span>{{ item.title }}</span>
          <v-divider light></v-divider>
          <v-layout justify-center>
            <h2>
              <strong>År {{ item.year }}</strong>
            </h2>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>
<style scoped>
</style>
<script>
export default {
  data() {
    return {
      answerIndex: 2,
      questions: [
        {
          title: "Gustav Vasa lägger grunden för reformationen.",
          year: "1964",
          category: "Kända svenska personer",
          id: 1
        },
        {
          title: "Klockupproret mot Gustav Vasa, bryter ut i Dalarna.",
          year: "1566",
          category: "Kända svenska personer",
          id: 2
        },
        {
          title:
            "Sveriges äldsta myndighet, Kammarkollegiet grundas av Gustav Vasa.",
          year: "1000",
          category: "Historiska händelser",
          id: 3
        },
        {
          title:
            "Nationalskalden Carl Michael Bellman dör den 11 februari, 55 år gammal.",
          year: "2019",
          category: "Kända svenska personer",
          id: 4
        },
        {
          title: "Kaffeförbudet från 1799 hävs.",
          year: "2018",
          category: "Historiska händelser",
          id: 5
        },
        {
          title: "Napoleon Bonaparte utropar sig själv till fransk kejsare.",
          year: "2035",
          category: "Historiska händelser",
          id: 6
        }
      ]
    };
  },
  computed: {
    sortedQuestions() {
      this.questions.sort((a, b) => a.year - b.year);
      return this.questions;
    },
    inactiveQuestions() {
      return Array.of(...this.sortedQuestions).filter(
        q => !Array.of(...this.activeQuestions).includes(q)
      );
    },
    activeQuestions() {
      if (this.questions.length === 1) return this.questions[0];
      return [
        this.questions[this.answerIndex],
        this.questions[this.answerIndex + 1]
      ];
    }
  },
  methods: {}
};
</script>

<style scoped>
#questions {
  overflow-y: scroll;
  margin-left: 35px;
}
#arrow {
  position: fixed;
  top: 230px;
  left: 10;
}
</style>


