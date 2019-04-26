import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import TeamSettings from "../views/TeamSettings.vue";
import RoundSettings from "../views/RoundSettings.vue";
import Game from "../views/Game.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/teamsettings",
      name: "teamsettings",
      component: TeamSettings
    },
    {
      path: "/roundsettings",
      name: "roundsettings",
      component: RoundSettings
    },
    {
      path: "/game",
      name: "game",
      component: Game
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
