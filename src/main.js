import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
/*eslint-disable*/
import auth from "@/auth";
/*eslint-enable*/
import store from "./store";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
