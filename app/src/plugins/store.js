import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import questions from "../data/swe-questions.json";
import defaultTeams from "../data/teams.json";
import Team from "../components/team";

export default new Vuex.Store({
  state: {
    questions,
    teams: new Map(),
    currentQuestionIndex: 6,
    currentTeamIndex: 0,
    totalRoundsPlayed: 0,
    currentRoundNr: 1,
    seenQuestions: [],
    roundLimit: 10
  },
  getters: {
    getAllTeams: ({ teams }) => {
      return Array.of(...teams.values());
    },
    getTeamsPlaying: ({ teams }) =>
      Array.of(...teams.values()).filter(team => team.isPlaying),
    getCurrentRoundNr: ({ currentRoundNr }) => currentRoundNr,
    getRoundLimit: ({ roundLimit }) => roundLimit,
    getTeamAnswers: ({ teams, currentTeamIndex }) => {
      const team = teams.get(currentTeamIndex);
      return team.answers.map(id => questions[id]);
    },
    getCurrentQuestion: ({ questions, currentQuestionIndex }) =>
      questions[currentQuestionIndex],
    getCurrentTeam: ({ teams, currentTeamIndex }) => {
      return teams.get(currentTeamIndex);
    }
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
      const {
        currentTeamIndex,
        teams,
        currentRoundNr,
        totalRoundsPlayed
      } = state;
      const teamsPlayingIndexes = Array.of(...teams.entries())
        .map(t => t[1])
        .filter(team => team.isPlaying)
        .map(t => t.index);

      // Update the round nr when the last player have played
      if (
        currentTeamIndex === teamsPlayingIndexes[teamsPlayingIndexes.length - 1]
      ) {
        state.currentRoundNr = currentRoundNr + 1;
      }
      state.totalRoundsPlayed = totalRoundsPlayed + 1;

      state.currentTeamIndex =
        teamsPlayingIndexes[
          (teamsPlayingIndexes.indexOf(currentTeamIndex) + 1) %
            teamsPlayingIndexes.length
        ];
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
        !team.isPlaying ||
        Array.of(...teams.values()).filter(team => team.isPlaying).length !== 1
      ) {
        team.isPlaying = !team.isPlaying;
      }
      teams.set(teamId, team);
      state.teams = new Map(teams.entries());

      // If the first team is deisPlaying then the currentTeamIndex is updated
      const teamsPlayingIndexes = Array.of(...teams.entries())
        .map(t => t[1])
        .filter(team => team.isPlaying)
        .map(t => t.index)
        .sort((a, b) => a - b);

      state.currentTeamIndex = teamsPlayingIndexes[0];
    },
    addNewTeam(state, name) {
      const { teams } = state;
      teams.set(teams.size, new Team(teams.size, name));
      state.teams = new Map(teams.entries());
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
    addTeam({ commit }, name) {
      commit("addNewTeam", name);
    }
  }
});
