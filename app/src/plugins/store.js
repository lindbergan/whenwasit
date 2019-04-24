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
    currentRoundNr: 1
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
    addPoint({ teams, currentTeamIndex }) {
      teams[currentTeamIndex].points += 1;
    },
    nextTeam(state) {
      const { currentTeamIndex, teams } = state;
      state.currentTeamIndex = (currentTeamIndex + 1) % teams.length;
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
      commit("nextTeam", state);
    }
  }
});
