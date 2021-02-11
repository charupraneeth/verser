<template>
  <div class="mw-500 px-4">
    <h1 class="title">Verify Email</h1>
    <form @submit.prevent="verifyEmail">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            v-model="email"
            class="input"
            type="email"
            placeholder="Email"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </p>
      </div>

      <div class="field">
        <button
          class="button is-primary"
          :class="[isLoading ? 'is-loading' : '']"
          type="subimit"
        >
          submit
        </button>
      </div>
    </form>
    <div class="error mt-3" v-if="errors">
      <div class="notification is-danger">
        <button @click="errors = ''" class="delete"></button>
        {{ errors }}
      </div>
    </div>
    <div class="error mt-3" v-if="message">
      <div class="notification is-primary">
        <button @click="message = ''" class="delete"></button>
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "../firebase";
import { ref } from "vue";
// import { useRouter } from "vue-router";

export default {
  setup() {
    // const router = useRouter();
    const email = ref(null);
    const errors = ref("");
    const message = ref("");
    const isLoading = ref(false);
    // valide the user inputs and return is there are any errors
    const validate = () => {
      if (!email.value || email.value == null)
        errors.value += "valid email is needed | ";
    };

    // register user into firebase
    async function verifyEmail() {
      isLoading.value = true;
      errors.value = "";
      message.value = "";
      validate();
      console.log("verification started");
      try {
        const user = auth.currentUser;
        const result = await user.sendEmailVerification();
        console.log(result);
        message.value += "verified succesfully";
      } catch (error) {
        errors.value += error.message || "failed to verify contact admin";
        throw error;
      }
    }
    return {
      message,
      errors,
      verifyEmail,
      email,
      isLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
.mw-500 {
  max-width: 500px;
  margin: auto;
}
</style>
