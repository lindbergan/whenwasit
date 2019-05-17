<template>
  <v-container fluid>
    <v-layout column wrap v-if="gameIsFinished">
      <v-card>
        <v-card-title primaryTitle>
          <h1>Slut</h1>
        </v-card-title>
        <v-card v-for="team in getTeamsPlaying" :key="team.index">
          <h3>{{ team.name }}</h3>
        </v-card>
      </v-card>
      <v-btn primary to="/">Spela igen</v-btn>
    </v-layout>
    <v-layout v-else-if="gameIsActive">
      <v-layout column wrap id="question-box" class="rounded">
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
    <v-layout v-else fill-height column wrap align-center white--text>
      <div style="display: flex; flex-direction: column; align-items: center;">
        <img src="img/icons/icon.png" width="75px" style="margin-bottom: 25px;">
        <h1 style="text-align: center;">Runda</h1>
        <h1 style="border-bottom: none; font-size: 75px; text-align: center;">{{getCurrentRoundNr}}</h1>
        <h1 style="margin-bottom: 25px; text-align: center;">Ställningen</h1>
        <ol>
          <h3>
            <li
              v-for="team in getTeamsPlaying"
              :key="getTeamsPlaying.indexOf(team)"
            >{{team.name}} - {{team.points}} poäng</li>
          </h3>
        </ol>
        <h2
          id="current-teams-turn"
          style="margin-top: 25px;"
          :class="{ isDashed: this.isDashed, isSolid: !this.isDashed }"
        >{{ getCurrentTeam.name }} tur!</h2>
        <v-btn
          style="margin-top: 25px; font-family: Open Sans; width: 100%"
          class="rounded"
          @click="startGame"
          large
        >Spela</v-btn>
      </div>
      <!--<v-card v-if="shouldShowPreviousQuestion">
        <v-card-title v-if="previousQuestion.wasCorrect">
          <h1>Rätt!</h1>
        </v-card-title>
        <v-card-title v-else>
          <h1>Fel! Rätt år var: {{ previousQuestion.year }}</h1>
        </v-card-title>
      </v-card>
      <v-card class="rounded" style="display: flex; flex-direction: column;">
        <v-card-title style="justify-content: center">
          <h1>{{ getCurrentTeam.name }}</h1>
        </v-card-title>
        <v-card-text>
          <h3 style="text-align: center">Runda {{ getCurrentRoundNr }}</h3>
          <h3 style="text-align: center">{{ getCurrentTeam.points }} poäng</h3>
        </v-card-text>
        <v-btn class="rounded" @click="startGame" x-large>
          <h3>
            <strong>Redo</strong>
          </h3>
        </v-btn>
      </v-card>-->
    </v-layout>
  </v-container>
</template>
<style scoped>
</style>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  created() {
    if (this.getCurrentTeam === undefined) {
      // Used for developers.
      // Vue doesn't refetch getCurrentTeam when refreshing page.
      const url = document.location.href;
      document.location.href = url.substring(0, url.indexOf("/", 8));
    }
    this.interval = setInterval(() => {
      this.isDashed = !this.isDashed;
    }, 1500);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  data() {
    return {
      gameIsActive: false,
      answerIndex: 0,
      totalScroll: 0,
      timeLeft: 30,
      previousQuestion: {
        year: null,
        wasCorrect: null
      },
      isDashed: false
    };
  },
  computed: {
    ...mapGetters([
      "getCurrentQuestion",
      "getTeamAnswers",
      "getCurrentTeam",
      "getCurrentRoundNr",
      "getRoundLimit",
      "getTeamsPlaying"
    ]),

    gameIsFinished: {
      cache: false,
      get() {
        return this.getCurrentRoundNr - 1 === this.getRoundLimit;
      }
    },
    shouldShowPreviousQuestion() {
      return this.previousQuestion.year !== null;
    },
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
    ...mapActions(["incTeamPoints", "addAnswerToTeam", "newRound"]),
    startGame() {
      this.gameIsActive = true;
      this.startTimer();
    },
    startTimer() {
      this.timer = setInterval(() => this.tick(), 1000);
    },
    resetForNextRound() {
      this.gameIsActive = false;
      this.answerIndex = 0;
      this.previousQuestion = {
        year: this.getCurrentQuestion.year,
        wasCorrect: this.isCorrectAnswer()
      };
      this.resetTimer();
      this.newRound();
    },
    tick() {
      if (this.timeLeft - 1 < 1) {
        this.resetForNextRound();
      }
      this.timeLeft -= 1;
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
      if (this.isCorrectAnswer()) {
        this.addAnswerToTeam();
        this.incTeamPoints();
      }
      this.resetForNextRound();
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
.rounded {
  border-radius: 15px;
}
h1 {
  font-size: 35px;
  font-family: "Raleway", sans-serif;
  border-bottom: 4px solid #8c90a5;
}
.isDashed {
  border-bottom: 4px dashed white;
}
.isSolid {
  border-bottom: 4px solid white;
}
</style>


