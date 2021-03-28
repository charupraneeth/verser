<template>
  <div class="center-align mt-5">
    <a @click="login" class="waves-effect waves-light btn-large blue br-30 mt-5"
      ><i class="material-icons left">login</i>signin with google</a
    >
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
