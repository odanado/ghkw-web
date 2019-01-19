import Vue from "vue";
import firebase from "firebase";
import App from "./App.vue";
import "./registerServiceWorker";

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyDOqq7tvhE5jqfwVxmxApTmjpfALGxD9bA",
  authDomain: "ghkw-web.firebaseapp.com",
  databaseURL: "https://ghkw-web.firebaseio.com",
  projectId: "ghkw-web",
  storageBucket: "ghkw-web.appspot.com",
  messagingSenderId: "29147635491"
});

new Vue({
  render: h => h(App)
}).$mount("#app");
