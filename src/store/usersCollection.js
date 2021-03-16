import { ref } from "vue";
import db from "@/db";
const users = ref([]);

db.collection("users").onSnapshot((querySnapshot) => {
  querySnapshot.forEach((user) => {
    if (user.data().phone && !users.value.includes(user.data().phone))
      users.value.push(user.data().phone);
  });
});
// .get()
// .then((data) =>
//   data.forEach((user) => {
//     if (!user.data().phone) return;
//     users.value.push(user.data().phone);
//   })
// );

export default users;
