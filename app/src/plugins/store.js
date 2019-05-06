import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import questions from "../data/swe-questions.json";
import defaultTeams from "../data/teams.json";

export default new Vuex.Store({
  state: {
    questions,
    teams: new Map(),
    currentQuestionIndex: 6,
    currentTeamIndex: 0,
    totalRoundsPlayed: 0,
    currentRoundNr: 1,
    seenQuestions: []
  },
  getters: {
    getAllTeams: ({ teams }) => {
      return Array.of(...teams.values());
    },
    getTeamAnswers: ({ teams, currentTeamIndex }) => {
      const team = teams.get(currentTeamIndex);
      return team.map(id => questions[id]);
    },
    getCurrentQuestion: ({ questions, currentQuestionIndex }) =>
      questions[currentQuestionIndex],
    getCurrentTeam: ({ teams, currentTeamIndex }) => {
      return teams.get(currentTeamIndex);
    },
    getCurrentRoundNr: ({ currentRoundNr }) => currentRoundNr
  },
  mutations: {
    addAnswer({ teams, currentQuestionIndex, currentTeamIndex }) {
      const team = teams.get(currentTeamIndex);
      team.answers.unshift(currentQuestionIndex);
      teams.set(currentTeamIndex, team);
    },
    initRound(state) {
      const { seenQuestions, teams } = state;
      for (var i = 0; i < defaultTeams.length; i++) {
        // Generate a unique index that hasn't been seen before
        let questionIndex = Math.floor(Math.random() * questions.length);
        while (seenQuestions.includes(questionIndex))
          questionIndex = Math.floor(Math.random() * questions.length);

        const defaultTeam = defaultTeams[i];
        defaultTeam.answers.unshift(questionIndex);
        teams.set(i, defaultTeam);
        seenQuestions.unshift(questionIndex);
      }
      state.teams = teams;
    },
    addPoint({ teams, currentTeamIndex }) {
      const team = teams.get(currentTeamIndex);
      team.points += 1;
      teams.set(currentTeamIndex, team);
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
    },
    changeTeamSelect(state, teamId) {
      const { teams } = state;
      const team = teams.get(teamId);
      if (
        !team.selected ||
        Array.of(...teams.values()).filter(t => t.selected).length !== 1
      ) {
        team.selected = !team.selected;
      }
      teams.set(teamId, team);
      state.teams = null;
      state.teams = teams;
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
    initGame({ commit }, state) {
      commit("initRound", state);
    },
    selectTeam({ commit }, teamId) {
      commit("changeTeamSelect", teamId);
    },
    testGetter({ state }) {
      const { teams } = state;
      return teams;
    }
  }
});
