<template>
  <v-container fluid>
    <v-layout v-if="gameIsActive">
      <v-layout column wrap id="question-box">
        <v-card>
          <v-card-text>
            <h2>{{ getCurrentQuestion.title }}</h2>
          </v-card-text>
        </v-card>
        <v-card>
          <h2>{{timeLeft}} s</h2>
        </v-card>
      </v-layout>
      <v-icon
        color="maroon"
        style="transform:scale(4);"
        :style="{ top: arrowTopLength + 'px' }"
        id="arrow"
      >arrow_right_alt</v-icon>
      <v-layout id="selector" column wrap fill-height justify-center>
        <v-icon x-large dark class="selector-btn" @click="updateAnswerIndex('Up')">arrow_drop_up</v-icon>
        <v-icon x-large dark class="selector-btn" @click="updateAnswerIndex('Down')">arrow_drop_down</v-icon>
      </v-layout>
      <v-layout id="answers" row wrap justify-space-around>
        <v-card
          v-for="item in sortedAnswers"
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
          <v-btn large @click="madeAnAnswer">Färdig</v-btn>
        </v-layout>
      </v-card>
    </v-layout>
    <v-layout v-else fill-height column wrap>
      <v-card>
        <v-card-title>
          <h1>{{ getCurrentTeam.name }}</h1>
        </v-card-title>
        <v-card-text>
          <h3>Runda {{ getCurrentRoundNr }}</h3>
          <h3>{{ getCurrentTeam.points }} poäng</h3>
        </v-card-text>
      </v-card>
      <v-card>
        <v-btn @click="startGame">Redo</v-btn>
      </v-card>
    </v-layout>
  </v-container>
</template>
<style scoped>
</style>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  created() {
    this.initRoundAnswers();
  },
  data() {
    return {
      currentTeamIndex: 0,
      gameIsActive: false,
      answerIndex: 0,
      totalScroll: 0,
      timeLeft: 30
    };
  },
  computed: {
    ...mapGetters([
      "getCurrentQuestion",
      "getTeamAnswers",
      "getCurrentTeam",
      "getCurrentRoundNr"
    ]),
    answerText() {
      if (this.answerIndex === 0) {
        return (
          "År " + this.sortedAnswers[this.answerIndex].year + " och tidigare"
        );
      } else if (this.answerIndex === this.sortedAnswers.length) {
        return (
          "År " + this.sortedAnswers[this.answerIndex - 1].year + " och senare"
        );
      } else {
        return (
          "Mellan år " +
          this.activeAnswers[0].year +
          " och år " +
          this.activeAnswers[1].year
        );
      }
    },
    sortedAnswers() {
      const totalAnswers = this.getTeamAnswers;
      totalAnswers.sort((a, b) => a.year - b.year);
      return totalAnswers;
    },
    activeAnswers() {
      const totalAnswers = this.getTeamAnswers;
      if (totalAnswers.length === 1 || this.answerIndex === 0)
        return [totalAnswers[0]];
      else if (this.answerIndex === totalAnswers.length)
        return [totalAnswers[totalAnswers.length - 1]];
      return [
        totalAnswers[this.answerIndex - 1],
        totalAnswers[this.answerIndex]
      ];
    },
    arrowTopLength() {
      const nr = this.answerIndex;
      const totalOffsetHeight = nr * 180 + 32 + (nr - 1) * 15 + 150;
      return totalOffsetHeight;
    }
  },
  methods: {
    ...mapActions([
      "incTeamPoints",
      "addAnswerToTeam",
      "newRound",
      "initRoundAnswers"
    ]),
    startGame() {
      this.gameIsActive = true;
      this.startTimer();
    },
    startTimer() {
      this.timer = setInterval(() => this.tick(), 1000);
    },
    tick() {
      if (this.timeLeft - 1 < 1) {
        this.gameIsActive = false;
        this.resetTimer();
        this.newRound();
      }
      // this.timeLeft -= 1;
    },
    isCorrectAnswer() {
      const { year } = this.getCurrentQuestion;
      if (this.activeAnswers.length === 1 && this.answerIndex === 0) {
        return year <= this.activeAnswers[0].year;
      } else if (this.sortedAnswers.length === this.answerIndex) {
        return year >= this.activeAnswers[0].year;
      } else {
        const afterYear = this.activeAnswers[0].year;
        const beforeYear = this.activeAnswers[1].year;
        return afterYear <= year && year <= beforeYear;
      }
    },
    resetTimer() {
      clearInterval(this.timer);
      this.timeLeft = 30;
    },
    madeAnAnswer() {
      this.resetTimer();
      if (this.isCorrectAnswer()) {
        this.addAnswerToTeam();
        this.incTeamPoints();
      }
      this.newRound();
      this.gameIsActive = false;
    },
    shouldBeActive(id) {
      return this.activeAnswers.map(i => i.index).includes(id);
    },
    updateAnswerIndex(origin) {
      const totalAnswers = this.getTeamAnswers;
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
            this.answerIndex + 1 > totalAnswers.length
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
#answers {
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


