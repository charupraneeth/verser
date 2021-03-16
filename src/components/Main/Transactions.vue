<template>
  <div>
    <h1>Transactions</h1>
    <!-- <pre>{{
      transactions.sort((a, b) => new Date(a.created) - new Date(b.created))
    }}</pre> -->
    <div
      class="card-container"
      v-for="transaction in transactions.sort(
        (a, b) => new Date(a.created) - new Date(b.created)
      )"
      :key="transaction.created"
    >
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span>status : </span>
          <span class="card-title">pending</span>
          <span>From : </span>
          <span class="card-title">{{ transaction.from.name }}</span>
          <span>To : </span>
          <span class="card-title">{{ transaction.to.name }}</span>
          <p>Amount : {{ transaction.amount }}</p>
          <span>Time : {{ transaction.created }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import firebase from "@/firebase";
import store from "@/store";
import db from "@/db";
import { ref, computed, watch } from "vue";
export default {
  setup() {
    const userId = computed(() => store.state.auth.user.id);
    const transactions = ref([]);

    function dateConvertedObject(param) {
      const obj = param;
      obj.created = obj.created.toDate().toString();
      return obj;
    }
    watch(
      userId,
      () => {
        if (!userId.value) return;
        db.collection("transactions")
          .where("from.id", "==", userId.value)
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // obj.created = obj.created.seconds.toDate();
              transactions.value.push(dateConvertedObject(doc.data()));
            });
          });
        db.collection("transactions")
          .where("to.id", "==", userId.value)
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              transactions.value.push(dateConvertedObject(doc.data()));
            });
          });
      },
      { immediate: true }
    );
    return {
      transactions,
    };
  },
};
</script>

<style scoped></style>
