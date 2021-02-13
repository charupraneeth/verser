import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Main from "../views/Main.vue";
import firebase from "@/firebase";
import VerifyPhone from "@/components/Main/VerifyPhone.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/main",
    name: "Main",
    component: Main,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/verify-phone",
    name: "VerifyPhone",
    component: VerifyPhone,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = firebase.auth().currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !user) {
    next("/");
  } else if (requiresAuth && user) {
    next();
  } else if (!requiresAuth && user) {
    next("/main");
  } else {
    next();
  }
});
export default router;
