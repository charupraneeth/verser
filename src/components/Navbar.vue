<template>
  <nav role="navigation" aria-label="navigation" class="teal mt-2">
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">safepe</a>

      <ul id="nav-mobile" class="right hide-on-med-and-down">
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
            <label for="autocomplete-input">search users</label>
          </div>
        </li>
        <li>
          <router-link
            v-if="!isLoggedIn"
            to="/"
            @click="isActive = false"
            class="button is-light"
            >Home
          </router-link>
        </li>
        <li>
          <router-link
            v-if="!isLoggedIn"
            to="/about"
            @click="isActive = false"
            class="button is-light"
            >About
          </router-link>
        </li>
        <li>
          <a v-if="isLoggedIn" @click="signout">
            <i class="material-icons left">logout</i>
            signout
          </a>
        </li>
        <li>
          <router-link
            v-if="isLoggedIn && !user.phone"
            to="/verify-phone"
            @click="isActive = false"
            class="button is-light"
            >Verify Phone
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
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
      router.push("/user/" + "91" + el.value.value.slice(4));
      // console.log(users.value);
      // console.log(instance);
    }
    onMounted(() => {
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
              searchUser();
              el.value.blur();
            },
          });
          // instance.open();
        } else {
          instance.updateData(searchTerms);
        }
      }
      instance = M.Autocomplete.init(el.value, {
        data: {},
        onAutocomplete: () => {
          searchUser();
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
