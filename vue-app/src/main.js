import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
Vue.use(require('vue-moment'));
Vue.use(require('./broadcast'));

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.scss"



Vue.config.productionTip = false;

new Vue({
  store,
  router,
   vuetify: new Vuetify({
     
     theme: {
    dark: false,
    default: 'light',
    disable: false,
    options: {
      cspNonce: undefined,
      customProperties: undefined,
      minifyTheme: undefined,
      themeCache: undefined,
    },
    
    themes: {
      light: {
        primary: '#0D47A1',
        secondary: '#BA5E5F',
        accent: '#FFAB00',
        error: '#b71c1c',
        header:'#000'
         },
        dark: {
        primary: '#2196F3',
        secondary: '#424242',
        accent: '#FF4081',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
    },
  },
  }),
  render: (h) => h(App)
}).$mount("#app");
