<template>
  <div>
    <button class="button is-primary" @click="login">Sign-In</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "register",
  methods: mapActions("auth", ["login"]),
};
</script>

<style lang="scss" scoped></style>
