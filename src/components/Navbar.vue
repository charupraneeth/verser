<template>
  <nav role="navigation" aria-label="navigation" class="teal mt-2">
    <div class="nav-wrapper">
      <a href="#" class="brand-logo ml-10px-lg">safepe</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"
        ><i class="material-icons">menu</i></a
      >
      <ul class="right hide-on-med-and-down">
        <li v-if="isLoggedIn">
          <div class="input-field">
            <i class="material-icons prefix">search</i>
            <input
              v-model="phone"
              ref="el"
              type="text"
              id="autocomplete-input"
              class="autocomplete"
              @load="loaded()"
            />
            <label for="autocomplete-input" class="white-text"
              >search users</label
            >
          </div>
        </li>
        <li>
          <router-link
            v-if="!isLoggedIn"
            to="/"
            @click="isActive = false"
            class="button is-light"
            >home
          </router-link>
        </li>
        <li>
          <router-link
            v-if="!isLoggedIn"
            to="/about"
            @click="isActive = false"
            class="button is-light"
            >about
          </router-link>
        </li>

        <li>
          <router-link
            v-if="isLoggedIn"
            to="/dashboard"
            @click="isActive = false"
            class="button is-light sidenav-close"
            ><i class="material-icons left">dashboard</i>
            dashboard
          </router-link>
        </li>
        <li>
          <router-link
            v-if="isLoggedIn"
            to="/dashboard/transactions"
            @click="isActive = false"
            class="button is-light sidenav-close"
            ><i class="material-icons left">account_balance</i>
            transactions
          </router-link>
        </li>
        <li>
          <router-link
            v-if="isLoggedIn"
            to="/dashboard/profile"
            @click="isActive = false"
            class="button is-light"
            ><i class="material-icons left">account_circle</i>
            profile
          </router-link>
        </li>

        <li>
          <router-link
            v-if="isLoggedIn && !user.phone"
            to="/dashboard/verify-phone"
            @click="isActive = false"
            class="button is-light"
            ><i class="material-icons left">perm_phone_msg</i>
            verify Phone
          </router-link>
        </li>
        <li>
          <a v-if="isLoggedIn" @click="signout">
            <i class="material-icons left">logout</i>
            signout
          </a>
        </li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav" id="mobile-demo">
    <!-- <li v-if="isLoggedIn">
      <div class="input-field col s6">
        <input
          ref="elMobile"
          v-model="phone"
          id="autocomplete-mobile"
          type="text"
          autocomplete="off"
        />
        <label for="autocomplete-mobile">search</label>
      </div>
    </li> -->
    <li>
      <router-link
        v-if="!isLoggedIn"
        to="/"
        @click="isActive = false"
        class="button is-light sidenav-close"
        >home
      </router-link>
    </li>
    <li>
      <router-link
        v-if="!isLoggedIn"
        to="/about"
        @click="isActive = false"
        class="button is-light sidenav-close"
        >about
      </router-link>
    </li>
    <li>
      <router-link
        v-if="isLoggedIn"
        to="/dashboard/transactions"
        @click="isActive = false"
        class="button is-light sidenav-close"
        ><i class="material-icons left">account_balance</i>
        transactions
      </router-link>
    </li>
    <li>
      <router-link
        v-if="isLoggedIn"
        to="/dashboard"
        @click="isActive = false"
        class="button is-light sidenav-close"
        ><i class="material-icons left">dashboard</i>
        dashboard
      </router-link>
    </li>
    <li>
      <router-link
        v-if="isLoggedIn"
        to="/dashboard/profile"
        @click="isActive = false"
        class="button is-light sidenav-close"
        ><i class="material-icons left">account_circle</i>
        profile
      </router-link>
    </li>

    <li>
      <router-link
        v-if="isLoggedIn && !user.phone"
        to="/dashboard/verify-phone"
        @click="isActive = false"
        class="button is-light sidenav-close"
        ><i class="material-icons left">perm_phone_msg</i>
        verify Phone
      </router-link>
    </li>
    <li>
      <a v-if="isLoggedIn" @click="signout" class="sidenav-close">
        <i class="material-icons left">logout</i>
        signout
      </a>
    </li>
  </ul>
</template>

<script>
import M from "materialize-css";
import { useRouter } from "vue-router";
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import users from "@/store/usersCollection";
export default {
  setup() {
    const store = useStore();
    const isActive = ref(false);
    const el = ref(null);
    const phone = ref("");
    const router = useRouter();
    let ins;
    // const users = computed(()=>)
    let instance;
    const isLoggedIn = computed(() => store.state.auth.isLoggedIn);
    const user = computed(() => store.state.auth.user);
    function signout() {
      isActive.value = false;
      store.dispatch("auth/logout");
    }
    function searchUser() {
      // console.log("searched", el.value.value);
      router.push("/dashboard/user/" + "91" + el.value.value.slice(4));
      // console.log(users.value);
      // console.log(instance);
    }
    onMounted(() => {
      console.log(el.value);
      const elems = document.querySelectorAll(".sidenav");
      ins = M.Sidenav.init(elems, {});
      console.log(ins);
      //autocomplete functionality
      function getUsers() {
        if (phone.value.length < 2) return;
        const searchTerms = users.value.reduce((acc, phone) => {
          acc["+91 " + phone.slice(3)] = null;
          return acc;
        }, {});
        if (!instance) {
          instance = M.Autocomplete.init(el.value, {
            data: searchTerms,
            onAutocomplete: () => {
              ins[0].close();
              searchUser();
              el.value.value = "";
              el.value.blur();
            },
          });
          instance.open();
        } else {
          instance.updateData(searchTerms);
        }
      }
      instance = M.Autocomplete.init(el.value, {
        data: {},
        onAutocomplete: () => {
          ins[0].close();
          searchUser();
          el.value.value = "";
          el.value.blur();
        },
      });
      let debounceTimer;
      watch(
        () => phone.value,
        () => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(async () => {
            getUsers();
          }, 400);
        }
      );
    });
    return {
      isActive,
      isLoggedIn,
      user,
      signout,
      el,
      phone,
      searchUser,
    };
  },

  // mounted() {
  //   this.instance = M.Autocomplete.init(this.$refs.autocompleteElement, {
  //     data: {
  //       "0000000000": null,
  //       "111": null,
  //     },
  //   });
  //   console.log(this.instance);
  // },
};
</script>

<style lang="scss" scoped>
.blue {
  background-color: blue;
}
</style>
