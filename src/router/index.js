import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
// import Main from "../views/Main.vue";
// import firebase from "@/firebase";
// import VerifyPhone from "@/components/Main/VerifyPhone.vue";
import User from "@/components/Main/User.vue";
import Dashboard from "@/components/Main/Dashboard.vue";
import Profile from "@/components/Main/Profile.vue";
import Transactions from "@/components/Main/Transactions.vue";
import Transaction from "@/components/Main/CurrentTransaction.vue";
import ScanQr from "@/components/Main/ScanQr.vue";
import { computed } from "vue";
import store from "@/store";

const isLoggedIn = computed(() => store.state.auth.isLoggedIn);
const user = computed(() => store.state.auth.user);
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter(to, from, next) {
      if (isLoggedIn.value && user.value) next({ name: "Dashboard" });
      else next();
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter(to, from, next) {
      if (!isLoggedIn.value || !user.value) next("/");
      else next();
    },
  },
  {
    path: "/dashboard/profile",
    name: "Profile",
    component: Profile,
    beforeEnter(to, from, next) {
      if (!isLoggedIn.value || !user.value) next({ name: "Home" });
      else next();
    },
  },
  {
    path: "/dashboard/transactions",
    name: "Transactions",
    component: Transactions,
    beforeEnter(to, from, next) {
      if (!isLoggedIn.value || !user.value) next({ name: "Home" });
      else next();
    },
  },
  {
    path: "/dashboard/scan-qr",
    name: "ScanQr",
    component: ScanQr,
    beforeEnter(to, from, next) {
      if (!isLoggedIn.value || !user.value) next({ name: "Home" });
      else next();
    },
  },
  {
    path: "/dashboard/transaction/:id",
    name: "Transaction",
    component: Transaction,
    props: true,
    beforeEnter(to, from, next) {
      if (!isLoggedIn.value || !user.value) next({ name: "Home" });
      else next();
    },
  },
  {
    path: "/dashboard/add-pin",
    name: "PinInput",
    component: () =>
      import(
        /* webpackChunkName: "VerifyPhone" */ "../components/Main/PinInput.vue"
      ),
    beforeEnter(to, from, next) {
      if (!isLoggedIn.value || !user.value) next({ name: "Home" });
      else if (user.value.pin) next({ name: "Dashboard" });
      else next();
    },
  },
  {
    path: "/dashboard/verify-phone",
    name: "VerifyPhone",
    component: () =>
      import(
        /* webpackChunkName: "VerifyPhone" */ "../components/Main/VerifyPhone.vue"
      ),
    beforeEnter(to, from, next) {
      if (!isLoggedIn.value || !user.value) next({ name: "Home" });
      else if (user.value.phone) next({ name: "Dashboard" });
      else next();
    },
  },
  {
    path: "/dashboard/user/:phone",
    name: "user",
    component: User,
    props: true,
    beforeEnter(to, from, next) {
      if (!isLoggedIn.value || !user.value) next({ name: "Home" });
      else next();
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

console.log(process.env.BASE_URL);
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
