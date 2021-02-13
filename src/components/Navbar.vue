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

    <!-- <span class="navbar-item">
      <img
        src="https://bulma.io/images/bulma-logo.png"
        width="112"
        height="28"
      />
    </span> -->
    <div
      id="nav-menu"
      class="navbar-menu"
      :class="[isActive ? 'is-active' : '']"
    >
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link
              v-if="!isLoggedIn"
              to="/"
              @click="isActive = false"
              class="button is-light"
              >Home
            </router-link>

            <!-- <router-link
              to="/login"
              @click="isActive = false"
              class="button is-light"
              >Login
            </router-link> -->

            <router-link
              to="/about"
              @click="isActive = false"
              class="button is-light"
              >About
            </router-link>
            <button class="button is-light" v-if="isLoggedIn" @click="signout">
              signout
            </button>
            <router-link
              v-if="isLoggedIn && !user.phone"
              to="/verify-phone"
              @click="isActive = false"
              class="button is-light"
              >Verify Phone
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => {
    return {
      isActive: false,
    };
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    signout() {
      this.isActive = false;
      this.logout();
    },
  },
  computed: {
    ...mapState("auth", ["isLoggedIn", "user"]),
  },
};
</script>

<style lang="scss" scoped></style>
