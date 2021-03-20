<template>
  <nav
    role="navigation"
    aria-label="navigation"
    class="teal mt-2  sidenav-padding"
  >
    <div class="nav-wrapper">
      <a href="#" class="brand-logo ml-10px-lg center">safepe</a>
      <a href="#" data-target="sidenav" class="sidenav-trigger "
        ><i class="material-icons">menu</i></a
      >
    </div>
  </nav>

  <ul class="sidenav sidenav-fixed" id="sidenav">
    <li v-if="isLoggedIn">
      <div class="input-field col s6 autocomplete-wrapper">
        <input
          ref="autoCompleteElement"
          v-model="phone"
          class="autocomplete"
          type="text"
          id="autocomplete"
          autocomplete="off"
        />
        <label for="autocomplete">search</label>
      </div>
    </li>
    <li>
      <router-link v-if="!isLoggedIn" to="/" class="button is-light "
        >home
      </router-link>
    </li>
    <li>
      <router-link v-if="!isLoggedIn" to="/about" class="button is-light "
        >about
      </router-link>
    </li>
    <li>
      <router-link v-if="isLoggedIn" to="/dashboard" class="button is-light "
        ><i class="material-icons left">dashboard</i>
        dashboard
      </router-link>
    </li>
    <li>
      <router-link
        v-if="isLoggedIn"
        to="/dashboard/transactions"
        class="button is-light "
        ><i class="material-icons left">account_balance</i> transactions
        <span v-if="isPendingTransactions">🎈</span>
      </router-link>
    </li>

    <li>
      <router-link
        v-if="isLoggedIn"
        to="/dashboard/profile"
        class="button is-light "
        ><i class="material-icons left">account_circle</i>
        profile
      </router-link>
    </li>

    <li>
      <router-link
        v-if="isLoggedIn && !user.phone"
        to="/dashboard/verify-phone"
        class="button is-light "
        ><i class="material-icons left">perm_phone_msg</i>
        verify Phone
      </router-link>
    </li>
    <li>
      <a
        v-if="isLoggedIn"
        @click="signout"
        class="button is-light"
        style="cursor:pointer"
      >
        <i class="material-icons left">logout</i>
        signout
      </a>
    </li>
  </ul>
</template>

<script>
import M from "materialize-css";
import isPendingTransactions from "@/store/isPendingTransactions";
import { useRouter } from "vue-router";
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import users from "@/store/usersCollection";
export default {
  setup() {
    const store = useStore();
    const autoCompleteElement = ref(null);
    const phone = ref("");
    const router = useRouter();
    let ins; // sidenav instance
    let autoCompleteInstance; // sidenav instance
    const isLoggedIn = computed(() => store.state.auth.isLoggedIn);
    const user = computed(() => store.state.auth.user);

    // get tiggered when user click signout
    function signout() {
      store.dispatch("auth/logout");
    }

    function searchUser() {
      router.push(
        "/dashboard/user/" + "91" + autoCompleteElement.value.value.slice(4)
      );
    }
    function initAutocomplete(ac) {
      autoCompleteInstance = M.Autocomplete.init(ac.value, {
        data: {},
        onAutocomplete: () => {
          searchUser(ac);

          // close sidenav on autocomplete in devices width smaller that 992px
          if (window.innerWidth <= 992) ins[0].close();

          ac.value.value = "";
          ac.value.blur();
        },
      });
    }
    onMounted(() => {
      watch(autoCompleteElement, () => {
        initAutocomplete(autoCompleteElement);
      });
      const elems = document.querySelectorAll(".sidenav");
      ins = M.Sidenav.init(elems, {});
      //autocomplete functionality
      function getUsers() {
        if (phone.value.length < 2) return;
        const searchTerms = users.value.reduce((acc, phone) => {
          acc["+91 " + phone.slice(3)] = null;
          return acc;
        }, {});
        autoCompleteInstance.updateData(searchTerms);
      }
      let debounceTimer;
      watch(phone, () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
          getUsers();
        }, 400);
      });
    });

    return {
      isLoggedIn,
      user,
      signout,
      autoCompleteElement,
      phone,
      searchUser,
      isPendingTransactions,
    };
  },
};
</script>

<style lang="scss" scoped>
#sidenav {
  padding-top: 10px;
}
.autocomplete-wrapper {
  padding: 0 10px;
  margin: 0 10px;
}
</style>
