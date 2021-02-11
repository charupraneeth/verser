<template>
  <nav
    class="navbar"
    :class="[isActive ? 'is-active' : '']"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a class="navbar-item" id="navbar-logo" href="/">
        Safepe
      </a>

      <a
        role="button"
        class="navbar-burger mt-2 mr-3"
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
      <div class="navbar-end navbar-item-wrapper">
        <router-link
          to="/"
          @click="isActive = false"
          class="button is-light navbar-item m-2"
          >Home
        </router-link>

        <router-link
          to="/login"
          @click="isActive = false"
          class="button is-light navbar-item m-2"
          >Login
        </router-link>

        <router-link
          to="/about"
          @click="isActive = false"
          class="button is-light navbar-item m-2"
          >About
        </router-link>
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

<style lang="scss" scoped>
.navbar {
  z-index: 0;
}
#navbar-logo {
  font-size: 2rem;
  color: rgb(30, 187, 187);
}
.navbar.is-active {
  z-index: 30;
  width: 80%;
  position: fixed;
  display: inline-block;
  // overflow-y: auto;
  top: 0;
  bottom: 0;
}
.navbar-burger span {
  height: 3px;
  width: 20px;
}
.navbar-item-wrapper.is-active {
  min-height: 100vh;
}
#nav-menu.is-active {
  height: 100%;
}
</style>
