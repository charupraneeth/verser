<template>
  <div class="user-container">
    <div class="progress" v-if="userState.loading">
      <div class="indeterminate"></div>
    </div>
    <div class="card user-card black white-text br-30" v-else>
      <div class="card-image mt-5 pt-16">
        <img :src="userState.data.photo" class="responsive-img avatar m-auto" />
      </div>
      <div class="card-content m-auto">
        <p class="card-title m-auto pl-0">{{ userState.data.name }}</p>
        <p>{{ userState.data.phone }}</p>
        <p>{{ userState.data.email }}</p>
      </div>
      <div class="input-field container">
        <input
          id="amount"
          type="number"
          step="any"
          class="validate white-text"
          v-model="amount"
        />
        <label for="amount" class="blue-text">Amount to pay</label>
      </div>
      <div class="card-action center br-30" v-show="!isDisabled">
        <a class="waves-effect waves-light btn blue" @click="preValidation"
          ><i class="material-icons">account_balance</i> pay</a
        >
      </div>
    </div>
    <div class="pin-overlay" v-if="showPinInput">
      <div class="pin-input-container container mt-3">
        <div class="transaction-credentials">
          <h5>
            To : {{ userState.data.name }} -
            <span>{{ userState.data.phone.substr(3) }}</span>
          </h5>
          <h4>Amount : {{ amount }}</h4>
        </div>
        <div class="input-field col s6 ">
          <i class="material-icons prefix blue-text">password</i>
          <input
            v-model="pin"
            id="pin"
            type="password"
            class="validate"
            placeholder="XXXX"
            min="4"
            max="4"
          />
          <button
            @click="verifyPin"
            class="waves-effect waves-light btn blue br-30 mt-3 mr-2"
          >
            confirm
          </button>
          <button
            class="waves-effect waves-light btn blue br-30 mt-3"
            @click="cancelPayment"
          >
            cancel
          </button>
        </div>
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
// sendMoney(userState.data.token)

export default {
  props: ["phone"],
  setup(props) {
    const userState = useUser(props);
    const amount = ref("");
    const pin = ref(null);
    const isDisabled = ref(false);
    const showPinInput = ref(false);

    // getting user credentials from store
    const user = computed(() => store.state.auth.user);

    function verifyPin() {
      if (isNaN(pin.value)) {
        M.toast({ html: "PIN should be a number" });
        pin.value = "";
        return;
      }

      // check the length
      if (pin.value.length !== 4) {
        M.toast({ html: "PIN is 4 digits" });
        pin.value = "";
        return;
      }

      // if pin matches
      if (user.value.pin == pin.value) {
        console.log("pin matched");
        sendMoney(userState.data.token);
        M.toast({ html: "pin verified" });
        showPinInput.value = false;
        return;
      }
      // not matched
      M.toast({ html: "pin did not match" });
      showPinInput.value = false;
      pin.value = null;
    }

    function cancelPayment() {
      showPinInput.value = false;
      pin.value = null;
    }

    function preValidation() {
      // if phone not verified return
      if (!user.value.phone) {
        M.toast({
          html: "You need to verify your phone to continue the transaction",
        });
        router.push("/dashboard/verify-phone");
        return;
      }
      // if amount is not a number
      if (isNaN(amount.value)) {
        M.toast({
          html: "Amount must be number",
        });
        return;
      }
      // if balance out of transaction range return
      if (user.value.balance < amount.value || amount.value < 1) {
        M.toast({
          html: "You have insufficient balance for your current transaction",
        });
        return;
      }
      showPinInput.value = true;
    }

    // send notification
    async function sendMoney(token) {
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
          html: response.data.message || "Transaction successfully initiated",
        });
        if (response.data.failed) {
          M.toast({
            html: "failed to notify the reciver try again later",
          });
          isDisabled.value = false;
          pin.value = null;
        }
      } catch (error) {
        console.log(error);
        M.toast({
          html: error.message || "Transaction failed",
          classes: "red white-text",
        });
        M.toast({ html: "try again!!!" });
        isDisabled.value = false;
        pin.value = null;
      }
    }
    return {
      userState,
      preValidation,
      amount,
      isDisabled,
      showPinInput,
      pin,
      verifyPin,
      cancelPayment,
    };
  },
};
</script>

<style lang="scss" scoped>
.pin-overlay {
  position: absolute;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  background: white;
  z-index: 1000;
  display: flex;
  justify-content: center;
}
</style>
