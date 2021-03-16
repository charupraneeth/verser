import firebase from "@/firebase";
import store from "@/store";
import db from "@/db";
import router from "@/router";
import token from "./store/token";

// import { computed } from "vue";
// const store = useStore();

firebase.auth().onAuthStateChanged(async function(user) {
  try {
    // console.log(user);
    if (user) {
      if (user.user) {
        /* eslint-disable */
        user = user.user;
        /* eslint-enable */
      }
      // if returning user
      if (!(user.metadata.creationTime == user.metadata.lastSignInTime)) {
        //get details from db and set state
        const docRef = db.collection("users").doc(user.uid);
        docRef.onSnapshot((doc) => {
          let setUser = doc.data();
          if (token.value && token.value != setUser.token) {
            docRef.update({
              token: token.value,
            });
          }
          store.commit("auth/setUser", setUser);
        });
        console.log("h1");
      } else {
        // new user
        const setUser = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          photo: user.photoURL,
          created_at: user.metadata.creationTime,
          balance: 50000,
          token: token.value,
        };
        db.collection("users")
          .doc(setUser.id)
          .set(setUser);
        store.commit("auth/setUser", setUser);
        console.log("h2");
        router.push("/dashboard/verify-phone");
      }

      // if (token.value && store.state.auth.user.token != token.value) {
      //   const id = computed(() => store.state.auth.user.id);
      //   db.collection("users")
      //     .doc(store.state.auth.user.id)
      //     .update({
      //       token: token.value,
      //     });
      //   console.log("token updated");
      // }
    } else {
      store.commit("auth/setUser", null);
      router.push("/");
      console.log("h3");
    }
  } catch (error) {
    console.log(error.message);
  }
});
