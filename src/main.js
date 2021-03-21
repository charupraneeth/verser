import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
/*eslint-disable*/
import users from "@/store/usersCollection";
import auth from "@/auth";
import messaging from "@/messaging";
/*eslint-enable*/
import "@/css/main.scss";

import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import store from "./store";
let app;
if (!app) {
  app = createApp(App)
    .use(store)
    .use(router)
    .mount("#app");
}
