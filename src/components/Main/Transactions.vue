<template>
  <div>
    <h4>Transactions</h4>
    <!-- <pre>{{ transactions }}</pre> -->
    <div v-if="!transactions.length">
      <h5>No transactions performed</h5>
    </div>
    <div v-else>
      <div
        class="card-container"
        v-for="transaction in transactions.sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        )"
        :key="transaction.id"
      >
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span>status : </span>
            <span class="card-title">{{ transaction.status }}</span>
            <span>From : </span>
            <span class="card-title">{{ transaction.from.name }}</span>
            <span>To : </span>
            <span class="card-title">{{ transaction.to.name }}</span>
            <p>Amount : {{ transaction.amount }}</p>
            <span>Time : {{ transaction.created }}</span>
          </div>
          <div class="card-action" v-if="transaction.status == 'pending'">
            <a :href="`/#/dashboard/transaction/${transaction.id}`"
              >go to transaction</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import firebase from "@/firebase";
import M from "materialize-css";
import store from "@/store";
import db from "@/db";
import isPendingTransactions from "@/store/isPendingTransactions";
import { ref, computed, watch, onMounted } from "vue";
export default {
  setup() {
    const userId = computed(() => store.state.auth.user.id);
    const transactions = ref([]);

    async function dateConvertedObject(details, id, doc) {
      try {
        const obj = details;
        if (
          new Date() - obj.created.toDate() > 300000 &&
          details.status == "pending"
        ) {
          await doc.ref.update({ status: "failed" });
          obj.status = "failed";
        }
        // console.log(new Date() - obj.created.toDate());
        obj.created = obj.created.toDate().toString();
        obj.id = id;
        return obj;
      } catch (error) {
        console.log(error);
        M.toast({ html: error.message });
      }
    }
    watch(
      userId,
      () => {
        if (!userId.value) return;
        db.collection("transactions")
          .where("from.id", "==", userId.value)
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
              // obj.created = obj.created.seconds.toDate();
              if (transactions.value.map((t) => t.id).indexOf(doc.id) !== -1) {
                transactions.value.pop(doc.id);
              }
              transactions.value.push(
                await dateConvertedObject(doc.data(), doc.id, doc)
              );
            });
          });
        db.collection("transactions")
          .where("to.id", "==", userId.value)
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
              if (transactions.value.map((t) => t.id).indexOf(doc.id) !== -1) {
                transactions.value.pop(doc.id);
              }
              transactions.value.push(
                await dateConvertedObject(doc.data(), doc.id, doc)
              );
            });
          });
      },
      { immediate: true }
    );
    onMounted(() => {
      isPendingTransactions.value = isPendingTransactions.value ? false : true;
    });
    return {
      transactions,
    };
  },
};
</script>

<style scoped></style>
