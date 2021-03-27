<template>
  <!-- <pre>{{ doc.data().status }}</pre> -->
  <div v-if="!isSender && isReciever">
    <h3>Current-Transaction</h3>
    <h4>id: {{ props.id }}</h4>
    <h4>Amount : {{ doc.data().amount }}</h4>
    <h4>From : {{ doc.data().from.name }}</h4>
    <h5>@phone : {{ doc.data().from.phone }}</h5>
    <button class="waves-effect waves-light btn mr-2 blue" @click="accept">
      accept
    </button>
    <button class="waves-effect waves-light btn blue" @click="reject">
      reject
    </button>
  </div>

  <div v-else-if="isSender && !isReciever">
    <h5>Waiting for approval ...</h5>
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
  </div>

  <!--  create a 404 component -->
  <div v-else>
    <h4>404 not found</h4>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import db from "@/db";
import store from "@/store";
import axios from "axios";
import M from "materialize-css";
import router from "../../router";
export default {
  setup(props) {
    const isSender = ref(true);
    const isReciever = ref(false);
    const doc = ref(null);
    async function accept() {
      const data = {
        to: doc.value.data().to,
        from: doc.value.data().from,
        amount: doc.value.data().amount,
        status: "successful",
      };
      try {
        const response = await axios.post(
          `/.netlify/functions/sendMoney`,
          data
        );
        console.log("client response:", response.data);
        M.toast({ html: response.data.message || "transaction successful" });
      } catch (error) {
        console.log(error);
        M.toast({ html: error.message || "transaction failed" });
      }
      doc.value.ref.update({ status: "success" });
      router.push("/dashboard");
    }
    function reject() {
      doc.value.ref.update({ status: "failed" });
      router.push("/dashboard");
    }

    onMounted(() => {
      db.collection("transactions")
        .doc(props.id)
        .onSnapshot((query) => {
          isSender.value = query.data().from.id == store.state.auth.user.id;
          isReciever.value = query.data().to.id == store.state.auth.user.id;
          if (query.data().status !== "pending") {
            router.push("/dashboard");
            M.toast({ html: `tranasction ${query.data().status}` });
          }
          doc.value = query;
        });
    });
    return {
      doc,
      props,
      isSender,
      accept,
      reject,
      isReciever,
    };
  },
  props: ["id"],
};
</script>

<style lang="scss" scoped></style>
