<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          width="112"
          height="28"
        />
      </a>

      <a
        role="button"
        class="navbar-burger"
        :class="[isActive ? 'is-active' : '']"
        aria-label="menu"
        aria-expanded="false"
        data-target="nav-menu"
        @click="isActive = isActive ? false : true"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="nav-menu"
      class="navbar-menu"
      :class="[isActive ? 'is-active' : '']"
    >
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link
              to="/"
              @click="isActive = false"
              class="button is-light"
              >Home
            </router-link>

            <router-link
              to="/login"
              @click="isActive = false"
              class="button is-light"
              >Login
            </router-link>

            <router-link
              to="/about"
              @click="isActive = false"
              class="button is-light"
              >About
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const isActive = ref(false);
    return {
      isActive,
    };
  },
};
</script>

<style lang="scss" scoped></style>
