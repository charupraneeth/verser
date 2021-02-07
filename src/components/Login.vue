<template>
  <div class="mw-500 px-4">
    <h1 class="title">Login</h1>
    <form @submit.prevent="login">
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
        <p class="control has-icons-left">
          <input
            v-model="password"
            class="input"
            type="password"
            placeholder="Password"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
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
  </div>
</template>

<script>
import { auth } from "../firebase";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const email = ref(null);
    const errors = ref("");
    const password = ref(null);
    const isLoading = ref(false);
    // valide the user inputs and return is there are any errors
    const validate = () => {
      if (!email.value || email.value == null)
        errors.value += "valid email is needed | ";
      if (!password.value || password.value.length <= 6)
        errors.value += "password must be atleast 6 characters long | ";
    };

    // register user into firebase
    async function login() {
      isLoading.value = true;
      errors.value = "";
      validate();
      if (errors.value) {
        isLoading.value = false;
        return;
      }
      // try signing up
      try {
        const userCredentials = await auth.signInWithEmailAndPassword(
          email.value,
          password.value
        );
        console.log(userCredentials);
        isLoading.value = false;
        router.push("dashboard");
      } catch (error) {
        // handling errors if any
        errors.value += error.message || "failed to login | ";
        console.log(error);
        isLoading.value = false;
      }
    }
    return {
      errors,
      login,
      email,
      password,
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
