import Vue from "vue";
import firebase from "firebase";
import WebFont from "webfontloader";

import App from "./App.vue";
import "./registerServiceWorker";

import "normalize.css";
import "./assets/styles/main.css";

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
  }
});

new Vue({
  render: h => h(App)
}).$mount("#app");
