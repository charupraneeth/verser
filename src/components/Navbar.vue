<template>
  <nav
    role="navigation"
    aria-label="navigation"
    class="bg-black mt-2  sidenav-padding"
  >
    <div class="nav-wrapper">
      <a href="#" class="brand-logo ml-10px-lg center" style="font-weight:600;"
        >Verser</a
      >

      <a href="#" data-target="sidenav" class="sidenav-trigger "
        ><i class="material-icons">menu</i></a
      >
    </div>
  </nav>

  <ul class="sidenav sidenav-fixed" id="sidenav">
    <li>
      <router-link
        v-if="!isLoggedIn"
        to="/"
        class="button is-light sidenav-close blue-text"
        >Home
      </router-link>
    </li>
    <li>
      <router-link
        v-if="!isLoggedIn"
        to="/about"
        class="button is-light sidenav-close blue-text"
        >About
      </router-link>
    </li>
    <li>
      <router-link
        v-if="isLoggedIn"
        to="/dashboard"
        class="button is-light sidenav-close blue-text"
        ><i class="material-icons left blue-text">dashboard</i>
        Dashboard
      </router-link>
    </li>
    <li>
      <router-link
        v-if="isLoggedIn"
        to="/dashboard/transactions"
        class="button is-light sidenav-close blue-text"
        ><i class="material-icons left blue-text">account_balance</i>
        Transactions
        <span v-if="isPendingTransactions">🎈</span>
      </router-link>
    </li>

    <li>
      <router-link
        v-if="isLoggedIn"
        to="/dashboard/profile"
        class="button is-light sidenav-close blue-text"
        ><i class="material-icons left blue-text">account_circle</i>
        Profile
      </router-link>
    </li>
    <li>
      <router-link
        v-if="isLoggedIn"
        to="/dashboard/scan-qr"
        class="button is-light sidenav-close blue-text"
        ><i class="material-icons left blue-text">qr_code</i>
        scan
      </router-link>
    </li>

    <li>
      <router-link
        v-if="isLoggedIn && !user.phone"
        to="/dashboard/verify-phone"
        class="button is-light sidenav-close blue-text"
        ><i class="material-icons left blue-text">perm_phone_msg</i>
        Verify Phone Number
      </router-link>
    </li>
    <li>
      <a
        v-if="isLoggedIn"
        @click="signout"
        class="button is-light sidenav-close red-text signoutcss"
        style="cursor:pointer"
      >
        <i class="material-icons left red-text">logout</i>
        Signout
      </a>
    </li>
  </ul>
</template>

<script>
import store from "@/store";
import M from "materialize-css";
import isPendingTransactions from "@/store/isPendingTransactions";
import { useRouter } from "vue-router";
import { ref, computed, onMounted, watch } from "vue";
export default {
  setup() {
    const router = useRouter();
    let ins; // sidenav instance

    const isLoggedIn = computed(() => store.state.auth.isLoggedIn);
    const user = computed(() => store.state.auth.user);
    // get tiggered when user click signout
    function signout() {
      store.dispatch("auth/logout");
    }

    onMounted(() => {
      const elems = document.querySelectorAll(".sidenav");
      ins = M.Sidenav.init(elems, {});
      //autocomplete functionality
    });

    return {
      isLoggedIn,
      user,
      signout,

      isPendingTransactions,
    };
  },
};
</script>

<style lang="scss" scoped>
svg {
  max-width: 100%;
}
#sidenav {
  padding-top: 10px;
}
@media screen and (max-width: 375px) {
  #sidenav {
    width: 235px;
  }
}
.autocomplete-wrapper {
  padding: 0 10px;
  margin: 0 10px;
}
.signoutcss {
  &:hover {
    background-color: rgba(255, 0, 0, 0.158) !important;
  }
}
</style>
