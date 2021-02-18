import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
/*eslint-disable*/
import users from "@/store/usersCollection";
import auth from "@/auth";
/*eslint-enable*/
import "@/css/main.scss";

import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import store from "./store";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
