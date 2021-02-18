import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
// import Main from "../views/Main.vue";
import firebase from "@/firebase";
import VerifyPhone from "@/components/Main/VerifyPhone.vue";
import User from "@/components/Main/User.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/verify-phone",
    name: "VerifyPhone",
    component: VerifyPhone,
  },
  {
    path: "/user/:phone",
    name: "user",
    component: User,
    props: true,
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
  if (to.matched.some((record) => record.meta.requiresLogin) && !user) {
    // set Vuex state's globalError, then redirect
    next("/");
  } else {
    next();
  }
});
export default router;
