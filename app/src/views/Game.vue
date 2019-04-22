<template>
  <v-container fluid>
    <v-icon
      color="maroon"
      style="transform:scale(4);"
      :style="{ top: cardHeight + 'px' }"
      id="arrow"
    >arrow_right_alt</v-icon>
    <v-layout id="selector" column wrap fill-height justify-center style="margin-left: -35px;">
      <v-btn class="selector-btn" @click="updateAnswerIndex('Up')">Upp</v-btn>
      <v-btn class="selector-btn" @click="updateAnswerIndex('Down')">Ner</v-btn>
    </v-layout>
    <v-layout id="questions" row wrap justify-space-around>
      <v-card
        v-for="item in sortedQuestions"
        :key="item.id"
        width="250"
        height="200"
        style="margin-bottom: 15px;"
        class="question-card"
        :class="[shouldBeActive(item.index) ? 'active' : 'inactive']"
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
      answerIndex: 0,
      questions: [
        {
          title: "Gustav Vasa lägger grunden för reformationen.",
          year: "1964",
          category: "Kända svenska personer",
          id: 1,
          index: 0
        },
        {
          title: "Klockupproret mot Gustav Vasa, bryter ut i Dalarna.",
          year: "1566",
          category: "Kända svenska personer",
          id: 2,
          index: 1
        },
        {
          title:
            "Sveriges äldsta myndighet, Kammarkollegiet grundas av Gustav Vasa.",
          year: "1000",
          category: "Historiska händelser",
          id: 3,
          index: 2
        },
        {
          title:
            "Nationalskalden Carl Michael Bellman dör den 11 februari, 55 år gammal.",
          year: "2019",
          category: "Kända svenska personer",
          id: 4,
          index: 3
        },
        {
          title: "Kaffeförbudet från 1799 hävs.",
          year: "2018",
          category: "Historiska händelser",
          id: 5,
          index: 4
        },
        {
          title: "Napoleon Bonaparte utropar sig själv till fransk kejsare.",
          year: "2035",
          category: "Historiska händelser",
          id: 6,
          index: 5
        }
      ]
    };
  },
  computed: {
    sortedQuestions() {
      this.questions.sort((a, b) => a.year - b.year);
      return this.questions;
    },
    activeQuestions() {
      if (this.questions.length === 1 || this.answerIndex === 0)
        return [this.questions[0]];
      else if (this.answerIndex === this.questions.length)
        return [this.questions[this.questions.length - 1]];
      return [
        this.questions[this.answerIndex - 1],
        this.questions[this.answerIndex]
      ];
    },
    inactiveQuestions() {
      if (
        (this.sortedQuestions !== undefined &&
          this.activeQuestions !== undefined) ||
        (this.sortedQuestions.length === 0 || this.activeQuestions.length === 0)
      )
        return [];
      return Array.of(...this.sortedQuestions).filter(
        q => !Array.of(...this.activeQuestions).includes(q)
      );
    },
    leftSideQuestions() {
      if (this.inactiveQuestions.length === 0) return [];
      return Array.of(...this.inactiveQuestions).filter(
        (_, i) => i < this.answerIndex
      );
    },
    rightSideQuestions() {
      if (this.inactiveQuestions.length === 0) return [];
      return Array.of(...this.inactiveQuestions).filter(
        (_, i) => i >= this.answerIndex
      );
    },
    cardHeight() {
      const nr = this.answerIndex;
      const totalOffsetHeight = nr * 200 + 32 + (nr - 1) * 15;
      return totalOffsetHeight;
    }
  },
  methods: {
    shouldBeActive(id) {
      return this.activeQuestions.map(i => i.index).includes(id);
    },
    updateAnswerIndex(origin) {
      switch (origin) {
        case "Up": {
          this.answerIndex =
            this.answerIndex - 1 < 0 ? this.answerIndex : this.answerIndex - 1;
          break;
        }
        case "Down": {
          this.answerIndex =
            this.answerIndex + 1 > this.questions.length
              ? this.answerIndex
              : this.answerIndex + 1;
          break;
        }
        default: {
          break;
        }
      }
    }
  }
};
</script>

<style scoped>
.active {
  border: 3px solid lightgreen;
}
.inactive {
  border: 3px solid maroon;
}
#questions {
  overflow-y: scroll;
  margin-left: 35px;
}
#arrow {
  position: absolute;
}
#selector {
  position: fixed;
  z-index: 3;
}
.selector-btn {
  float: left;
  height: 80px;
}
</style>


