import { reactive, watch } from "vue";
import db from "../db";
const userState = reactive({
  loading: true,
  error: "",
  data: {},
});

export default function useUser(props) {
  async function loadData() {
    try {
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
      // console.log(res[0]);
      userState.data = res[0];
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
