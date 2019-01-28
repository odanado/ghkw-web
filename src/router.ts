import Vue from "vue";
import VueRouter, { RouteConfig, NavigationGuard } from "vue-router";

import store from "@/store";
import Home from "@/views/Home.vue";
import SignIn from "@/views/SignIn.vue";

Vue.use(VueRouter);

const requiresAuth: NavigationGuard = (_, __, next) => {
  store.dispatch("loadAccessToken");
  if (store.getters.isSignIn) {
    next();
  } else {
    console.log("not sign in");
    next({ path: "/sign-in" });
  }
};

const signInPage: NavigationGuard = (_, __, next) => {
  store.dispatch("loadAccessToken");
  if (store.getters.isSignIn) {
    next({ path: "/" });
  } else {
    next();
  }
};

const routes: RouteConfig[] = [
  { path: "/", component: Home, beforeEnter: requiresAuth },
  { path: "/sign-in", component: SignIn, beforeEnter: signInPage }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
