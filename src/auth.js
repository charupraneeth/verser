import firebase from "@/firebase";
import store from "@/store";
import db from "@/db";
import router from "@/router";
// const store = useStore();
// const router = useRouter();
firebase.auth().onAuthStateChanged(async (user) => {
  try {
    if (user) {
      console.log("user : ", user);
      if (user.user) {
        /* eslint-disable */
        user = user.user;
        /* eslint-enable */
      }
      // if returning user
      if (!(user.metadata.creationTime == user.metadata.lastSignInTime)) {
        //get details from db and set state
        db.collection("users")
          .doc(user.uid)
          .onSnapshot((doc) => {
            const setUser = doc.data();
            store.commit("auth/setUser", setUser);
          });
      } else {
        const setUser = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          photo: user.photoURL,
          created_at: user.metadata.creationTime,
          balance: 50000,
        };
        db.collection("users")
          .doc(setUser.id)
          .set(setUser);
        store.commit("auth/setUser", setUser);
        // router.push("main");
      }
      // new user
    } else {
      store.commit("auth/setUser", null);
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
});
