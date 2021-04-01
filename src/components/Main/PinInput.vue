<template>
  <div>
    <div class="input-field col s6">
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
        @click="addPin"
        class="waves-effect waves-light btn blue br-30 mt-3"
      >
        Add Pin
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import M from "materialize-css";
import db from "../../db";
import store from "../../store";
export default {
  setup() {
    const pin = ref(null);
    async function addPin() {
      // check if pin is a number
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
      // hash the pin

      // add the pin to the database
      const id = computed(() => store.state.auth.user.id);
      //   console.log(id.value);
      db.collection("users")
        .doc(id.value)
        .update({
          pin: pin.value,
        });
      M.toast({ html: "successfully added the pin" });
      store.dispatch("auth/logout");
      M.toast({ html: "Signin again to get started" });
    }
    return {
      addPin,
      pin,
    };
  },
};
</script>

<style lang="scss" scoped></style>
