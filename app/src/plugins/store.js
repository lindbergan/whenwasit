import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import questions from "../data/swe-questions.json";
import teams from "../data/teams.json";

export default new Vuex.Store({
  state: {
    questions,
    teams,
    currentQuestionIndex: 6,
    currentTeamIndex: 0,
    totalRoundsPlayed: 0,
    currentRoundNr: 1,
    seenQuestions: []
  },
  getters: {
    getAllTeams: state => state.teams,
    getTeamAnswers: ({ teams, currentTeamIndex }) =>
      teams[currentTeamIndex].answers.map(id => questions[id]),
    getCurrentQuestion: ({ questions, currentQuestionIndex }) =>
      questions[currentQuestionIndex],
    getCurrentTeam: ({ teams, currentTeamIndex }) => teams[currentTeamIndex],
    getCurrentRoundNr: ({ currentRoundNr }) => currentRoundNr
  },
  mutations: {
    addAnswer({ teams, currentQuestionIndex, currentTeamIndex }) {
      teams[currentTeamIndex].answers.unshift(currentQuestionIndex);
    },
    initRound({ teams, seenQuestions }) {
      for (var i = 0; i < teams.length; i++) {
        const index = Math.floor(Math.random() * questions.length);
        teams[i].answers.unshift(index);
        seenQuestions.unshift(index);
      }
    },
    addPoint({ teams, currentTeamIndex }) {
      teams[currentTeamIndex].points += 1;
    },
    nextTeam(state) {
      const { currentTeamIndex, teams } = state;
      state.currentTeamIndex = (currentTeamIndex + 1) % teams.length;
    },
    changeQuestion(state) {
      const { seenQuestions } = state;
      const notSeen = questions.filter(q => !seenQuestions.includes(q));
      const index = Math.floor(Math.random() * notSeen.length);
      state.currentQuestionIndex = index;
    },
    addQuestionToSeen(state) {
      const { seenQuestions, currentQuestionIndex } = state;
      seenQuestions.unshift(currentQuestionIndex);
    }
  },
  actions: {
    addAnswerToTeam({ commit, state }) {
      commit("addAnswer", [state.currentQuestionIndex, state.currentTeamIndex]);
    },
    incTeamPoints({ commit, state }) {
      commit("addPoint", state, state.currentTeamIndex);
    },
    newRound({ commit }, state) {
      commit("addQuestionToSeen", state);
      commit("nextTeam", state);
      commit("changeQuestion", state);
    },
    initRoundAnswers({ commit }, state) {
      commit("initRound", state);
    }
  }
});
