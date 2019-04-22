<template>
  <v-container fluid>
    <v-layout column wrap id="question-box">
      <v-card>
        <v-card-text>
          <h2>{{ superQuestion.title }}</h2>
        </v-card-text>
      </v-card>
    </v-layout>
    <v-icon
      color="maroon"
      style="transform:scale(4);"
      :style="{ top: cardHeight + 'px' }"
      id="arrow"
    >arrow_right_alt</v-icon>
    <v-layout id="selector" column wrap fill-height justify-center>
      <v-icon x-large dark class="selector-btn" @click="updateAnswerIndex('Up')">arrow_drop_up</v-icon>
      <v-icon x-large dark class="selector-btn" @click="updateAnswerIndex('Down')">arrow_drop_down</v-icon>
    </v-layout>
    <v-layout id="questions" row wrap justify-space-around>
      <v-card
        v-for="item in sortedQuestions"
        :key="item.id"
        width="250"
        height="180"
        style="margin-bottom: 15px;"
        class="question-card"
        :class="[shouldBeActive(item.index) ? 'active' : 'inactive']"
      >
        <v-card-title>
          <h3>År {{ item.year }}</h3>
        </v-card-title>
        <v-card-text>
          <h3>{{ item.category }}</h3>
          <span>{{ item.title }}</span>
        </v-card-text>
      </v-card>
    </v-layout>
    <v-card id="answer-box">
      <v-layout column wrap align-center>
        <v-card-title>
          <h2>{{ answerText }}</h2>
        </v-card-title>
        <v-btn large>Färdig</v-btn>
      </v-layout>
    </v-card>
  </v-container>
</template>
<style scoped>
</style>
<script>
export default {
  components: {},
  data() {
    return {
      answerIndex: 1,
      totalScroll: 0,
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
      ],
      superQuestion: {
        title: "När föddes Gustav Vasa?",
        year: "1465",
        category: "Kända svenska personer"
      }
    };
  },
  computed: {
    answerText() {
      if (this.answerIndex === 0) {
        return (
          "År " + this.sortedQuestions[this.answerIndex].year + " och tidigare"
        );
      } else if (this.answerIndex === this.sortedQuestions.length) {
        return (
          "År " +
          this.sortedQuestions[this.answerIndex - 1].year +
          " och senare"
        );
      } else {
        return (
          "Mellan år " +
          this.activeQuestions[0].year +
          " och år " +
          this.activeQuestions[1].year
        );
      }
    },
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
    cardHeight() {
      const nr = this.answerIndex;
      const totalOffsetHeight = nr * 180 + 32 + (nr - 1) * 15 + 150;
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
          this.totalScroll -= 200;
          window.scroll(0, this.totalScroll);
          break;
        }
        case "Down": {
          this.answerIndex =
            this.answerIndex + 1 > this.questions.length
              ? this.answerIndex
              : this.answerIndex + 1;
          this.totalScroll += 200;
          window.scroll(0, this.totalScroll);
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
  margin-top: 150px;
  margin-bottom: 125px;
}
#arrow {
  position: absolute;
}
#selector {
  position: fixed;
  z-index: 3;
}
.selector-btn {
  width: 100%;
  height: 50px;
  margin-left: -10px;
  cursor: pointer;
}
#question-box {
  position: fixed;
  top: 0;
  z-index: 3;
  width: 100%;
  margin-left: -30px;
  text-align: center;
}
#answer-box {
  position: fixed;
  bottom: 0;
  z-index: 3;
  width: 100%;
  margin-left: -30px;
  text-align: center;
}
</style>


