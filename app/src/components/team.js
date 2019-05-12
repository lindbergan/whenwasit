export default class Team {
  constructor(index, name) {
    return {
      index,
      name,
      points: 0,
      answers: [],
      isPlaying: true
    };
  }
}
