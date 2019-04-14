import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import TeamSettings from "../views/TeamSettings.vue";
import RoundSettings from "../views/RoundSettings.vue";

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
    }
  ]
});
