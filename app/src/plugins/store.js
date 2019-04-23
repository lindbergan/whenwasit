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
    addAnswer(state, answerId, teamId) {
      state.teams[teamId].answers.unshift(state.questions[answerId]);
    },
    addPoint(state, teamId) {
      state.teams[teamId].points += 1;
    }
  },
  actions: {}
});
