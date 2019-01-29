import Vue from "vue";
const VueAnalytics = require("vue-analytics");

import firebase from "firebase";
import WebFont from "webfontloader";

import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";

import "normalize.css";
import "./assets/styles/main.css";
import "@fortawesome/fontawesome-free/css/all.css";

import store from "./store";

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyDOqq7tvhE5jqfwVxmxApTmjpfALGxD9bA",
  authDomain: "ghkw-web.firebaseapp.com",
  databaseURL: "https://ghkw-web.firebaseio.com",
  projectId: "ghkw-web",
  storageBucket: "ghkw-web.appspot.com",
  messagingSenderId: "29147635491"
});

WebFont.load({
  google: {
    families: ["Noto+Sans+JP"]
  },
  loading: () =>
    store.commit("setIsWebFontLoading", { isWebFontLoading: true }),
  active: () =>
    store.commit("setIsWebFontLoading", { isWebFontLoading: false }),
  inactive: () =>
    store.commit("setIsWebFontLoading", { isWebFontLoading: false })
});

Vue.use(VueAnalytics, {
  id: "UA-49269757-16",
  router
});

new Vue({
  render: h => h(App),
  store,
  router
}).$mount("#app");
