<template>
  <div>
    <div class="progress" v-if="userState.loading">
      <div class="indeterminate"></div>
    </div>
    <div class="card user-card" v-else>
      <div class="card-image">
        <img :src="userState.data.photo" class="responsive-img avatar m-auto" />
      </div>
      <div class="card-content mw-200px m-auto">
        <p class="card-title">{{ userState.data.name }}</p>
        <p>{{ userState.data.phone }}</p>
        <p>{{ userState.data.email }}</p>
      </div>
      <div class="input-field container">
        <input
          id="amount"
          type="number"
          step="any"
          class="validate"
          v-model="amount"
        />
        <label for="amount">Amount to pay</label>
      </div>
      <div class="card-action center" v-show="!isDisabled">
        <a
          class="waves-effect waves-light btn"
          @click="sendMoney(userState.data.token)"
          ><i class="material-icons">account_balance</i> pay</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import useUser from "@/hooks/useUser";
import axios from "axios";
import { computed, ref } from "vue";
import store from "@/store";
import M from "materialize-css";
import router from "../../router";
// import { computed } from "vue";
export default {
  props: ["phone"],
  setup(props) {
    const userState = useUser(props);
    const amount = ref("");
    const isDisabled = ref(false);
    async function sendMoney(token) {
      // getting user credentials from store
      const user = computed(() => store.state.auth.user);

      // if phone not verified return
      if (!user.value.phone) {
        M.toast({ html: "You must verify your phone to continue transaction" });
        router.push("/dashboard/verify-phone");
        return;
      }

      // if balance out of transaction range return
      if (user.value.balance < amount.value) {
        M.toast({ html: "insufficient balance for current transaction" });
        return;
      }
      isDisabled.value = true;
      const data = {
        to: {
          name: userState.data.name,
          id: userState.data.id,
          phone: userState.data.phone,
        },
        from: {
          name: user.value.name,
          id: user.value.id,
          phone: user.value.phone,
        },
        amount: amount.value,
        status: "pending",
      };
      try {
        const response = await axios.post(
          `/.netlify/functions/sendMoney?token=${token}`,
          data
        );
        console.log("client response:", response.data.transaction);
        if (response.data.transaction.id) {
          isDisabled.value = false;
        }
        router.push("/dashboard/transaction/" + response.data.transaction.id);
        M.toast({
          html: response.data.message || "transaction successfully initiated",
        });
      } catch (error) {
        console.log(error);
        M.toast({ html: error.message || "transaction failed" });
      }
    }
    return {
      userState,
      sendMoney,
      amount,
      isDisabled,
    };
  },
};
</script>

<style lang="scss" scoped></style>
