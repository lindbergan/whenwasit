<template>
  <v-container fluid>
    <v-layout column wrap v-if="gameIsFinished" white--text align-center>
      <img src="img/icons/icon.png" width="75px" style="margin-bottom: 25px;">
      <img
        width="100%"
        style="max-width: 350px; margin-bottom: 25px; align-self: center"
        src="img/icons/name.png"
      >
      <h1 style="margin-bottom: 25px;">Slut</h1>
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
        style="margin-top: 25px; margin-bottom: 25px;"
        :class="{ isDashed: this.isDashed, isSolid: !this.isDashed }"
      >{{ getCurrentTeam.name }} VINNER!</h2>
      <v-btn round large style="font-family: Open Sans" @click="endGame()" to="/">Spela igen</v-btn>
    </v-layout>
    <v-layout v-else-if="gameIsActive" white--text>
      <div style="display: flex; flex-direction: column; align-items: center;">
        <div v-if="fixTimeTop" style="z-index: 3; position: fixed; top: 30px;">
          <v-card class="rounded">
            <v-layout row wrap justify-center align-center>
              <v-card-text style="text-align: center;">
                <h1
                  style="margin-bottom: 25px; width: 50px; display: inline; margin-right: 25px;"
                >{{timeLeft}}</h1>
                <h3
                  style="font-family: Open Sans; font-weight: 400; display: inline;"
                >{{ getCurrentQuestion.title }}</h3>
              </v-card-text>
            </v-layout>
          </v-card>
        </div>
        <img src="img/icons/name.png" style="width: 100%; margin-bottom: 25px;">
        <v-card class="rounded" ref="questionAndTime">
          <div style="display: flex; flex-direction: column; align-items: center;">
            <v-card-text style="text-align: center;">
              <h3 style="font-family: Open Sans; font-weight: 400;">{{ getCurrentQuestion.title }}</h3>
            </v-card-text>
          </div>
        </v-card>
        <h1 style="margin-bottom: 25px; font-size: 55px;">{{timeLeft}}</h1>
        <v-layout id="answers" row wrap>
          <v-card
            v-for="item in sortedAnswers"
            :key="sortedAnswers.indexOf(item)"
            style="margin-bottom: 15px; padding: 5px; width: 100%;"
            class="rounded"
            ref="answers"
            :class="[shouldBeActive(item.index) ? 'active' : 'inactive']"
            @click="updateAnswerIndex(sortedAnswers.indexOf(item))"
          >
            <v-card-title style="justify-content: center; width: 100%;">
              <h2>År {{ item.year }}</h2>
            </v-card-title>
            <v-card-text>
              <p>{{ item.title }}</p>
            </v-card-text>
          </v-card>
        </v-layout>
        <v-btn
          :style="[buttonBotShouldBeDark ? {
              position: 'fixed',
              bottom: '20px',
              backgroundColor: '#222646',
              color: 'white'
            } : {
            position: 'initial'
          }]"
          ref="btnBot"
          style="font-family: Open Sans; height: 75px;"
          round
          large
          @click="madeAnAnswer"
        >{{answerText}}</v-btn>
      </div>
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
// import goTo from 'vuetify/lib/components/Vuetify/goTo'
const defaultTime = process.env.NODE_ENV === "development" ? 900 : 45;
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
      gameIsFinished: false,
      answerIndex: 0,
      totalScroll: 0,
      timeLeft: defaultTime,
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
    buttonBotShouldBeDark: {
      cache: false,
      get: function() {
        if (this.$refs.btnBot && this.$refs.answers) {
          return (
            window.scrollY + window.innerHeight <
              this.$refs.answers[this.$refs.answers.length - 1].$el.offsetTop &&
            this.$refs.answers[this.$refs.answers.length - 1].$el.offsetTop >
              window.innerHeight
          );
        }
        return false;
      }
    },
    fixTimeTop: {
      cache: false,
      get: function() {
        if (this.$refs.questionAndTime) {
          return window.scrollY > this.$refs.questionAndTime.$el.offsetTop;
        }
        return false;
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
        if (this.getCurrentRoundNr === this.getRoundLimit) {
          this.resetTimer();
          this.gameIsFinished = true;
        } else {
          this.resetForNextRound();
        }
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
      this.timeLeft = defaultTime;
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
    updateAnswerIndex(id) {
      const totalAnswers = this.getTeamAnswers;
      if (id < this.answerIndex) {
        this.answerIndex =
          this.answerIndex - 1 < 0 ? this.answerIndex : this.answerIndex - 1;
      } else {
        this.answerIndex =
          this.answerIndex + 1 > totalAnswers.length
            ? this.answerIndex
            : this.answerIndex + 1;
      }
    },
    endGame() {
      this.gameIsActive = false;
      this.gameIsFinished = false;
    }
  }
};
</script>

<style scoped>
.active {
  border: 5px solid seagreen;
}
.inactive {
  border: 5px solid #8c90a5;
}
#answers {
  overflow-y: scroll;
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


