import Vue from "vue";
import App from "./App.vue";

import "./plugins/vuetify";
import router from "./plugins/router";

import store from "./plugins/store";
import "./registerServiceWorker";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
