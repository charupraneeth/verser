import { ref } from "vue";
import db from "@/db";
const users = ref([]);

db.collection("users")
  .get()
  .then((data) =>
    data.forEach((user) => {
      if (!user.data().phone) return;
      users.value.push(user.data().phone);
    })
  );

export default users;
