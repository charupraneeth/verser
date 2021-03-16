<template>
  <div v-if="!isSender">
    <h1>Current-Transaction</h1>
    <h4>id: {{ props.id }}</h4>
    <button class="btn" @click="accept">accept</button>
    <button class="btn" @click="reject">reject</button>
  </div>
  <div v-else>
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import db from "@/db";
import firebase from "@/firebase";
import store from "@/store";
export default {
  setup(props) {
    const isSender = ref(true);
    const doc = ref(null);
    db.collection("transactions")
      .doc(props.id)
      .onSnapshot((query) => {
        isSender.value = query.data().from.id == store.state.auth.user.id;
        doc.value = query;
      });
    function accept() {
      // const transaction = doc.value.data();
      // const increment = firebase.firestore.FieldValue.increment(
      //   transaction.amount
      // );

      // const decrement = firebase.firestore.FieldValue.decrement(
      //   transaction.amount
      // );
      // db.collection("users")
      //   .doc(doc.value.data().to.id)
      //   .update({ balance: increment });
      db.collection("users")
        .doc(doc.value.data().from.id)
        .update({ balance: decrement });
      doc.value.ref.update({ status: "success" });
    }
    function reject() {
      doc.value.ref.update({ status: "failed" });
    }
    return {
      props,
      isSender,
      accept,
      reject,
    };
  },
  props: ["id"],
};
</script>

<style lang="scss" scoped></style>
