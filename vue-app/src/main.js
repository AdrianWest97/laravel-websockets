/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
Vue.use(require('vue-moment'));
Vue.use(require('./broadcast'));


import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.scss"
import vuetify from './plugins/vuetify';




Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
