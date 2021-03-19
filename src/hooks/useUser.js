import { reactive, watch } from "vue";
import db from "../db";
import M from "materialize-css";
import firebase from "@/firebase";
import router from "@/router";

const userState = reactive({
  loading: true,
  error: "",
  data: {},
});

export default function useUser(props) {
  async function loadData() {
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser && currentUser.phoneNumber == "+" + props.phone) {
        router.push("/dashboard");
        M.toast({ html: "you cannot pay yourself" });
      }

      userState.loading = true;
      userState.error = "";
      userState.data = {};

      const docRef = await db
        .collection("users")
        .where("phone", "==", "+" + props.phone)
        .get();
      //   const data = docRef.data();
      const res = [];
      docRef.forEach((user) => res.push(user.data()));
      userState.data = res[0];
      if (!res[0]) {
        userState.error = "user not found | verify the number before search";
        M.toast({ html: userState.error });
      }
    } catch (error) {
      userState.error = error.message || "error fetching user data";
      console.log(error);
    } finally {
      userState.loading = false;
    }
  }
  watch(() => props.phone, loadData, { immediate: true });
  return userState;
}
