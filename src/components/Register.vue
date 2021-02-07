<template>
  <div class="mw-500 px-4">
    <h1 class="title">Login</h1>
    <form @submit.prevent="register">
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
          <!-- <span class="icon is-small is-right" v-if="isEmailValid">
            <i class="fas fa-check"></i>
          </span> -->
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

export default {
  setup() {
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
    async function register() {
      isLoading.value = true;
      errors.value = "";
      validate();
      if (errors.value) {
        isLoading.value = false;
        return;
      }
      // try signing up
      try {
        const userCredentials = await auth.createUserWithEmailAndPassword(
          email.value,
          password.value
        );
        console.log(userCredentials);
        isLoading.value = false;
      } catch (error) {
        // handling errors if any
        errors.value += error.message || "failed to login | ";
        console.log(error);
        isLoading.value = false;
      }
    }
    return {
      errors,
      register,
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

<script>
import { auth } from "../firebase";
import { ref } from "vue";

export default {
  setup() {
    const email = ref(null);
    const errors = ref("");
    const password = ref(null);

    // valide the user inputs and return is there are any errors
    const validate = () => {
      if (!email.value || email.value == null)
        errors.value += "valid email is needed | ";
      if (!password.value || password.value.length <= 6)
        errors.value += "password must be atleast 6 characters long | ";
    };

    // register user into firebase
    async function register() {
      errors.value = "";
      validate();
      if (errors.value) return;
      // try signing up
      try {
        const userCredentials = await auth.createUserWithEmailAndPassword(
          email.value,
          password.value
        );
        console.log(userCredentials);
      } catch (error) {
        // handling errors if any
        errors.value += error.message || "failed to signup | ";
        console.log(error);
      }
    }
    return {
      errors,
      register,
      email,
      password,
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
