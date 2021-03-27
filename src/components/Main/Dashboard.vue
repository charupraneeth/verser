<template>
  <div>
    <h6>
      Hello,<br />
      {{ name }}
    </h6>
    <!-- <input
          ref="autoCompleteElement"
          v-model="phone"
          class="autocomplete"
          type="text"
          id="autocomplete"
          autocomplete="off"
        />
        <label for="autocomplete">search</label> -->
    <div>
      <div class="input-field br-30">
        <i class="material-icons prefix white-text pl-1">search</i>
        <input
          type="text"
          id="autocomplete-input"
          class="autocomplete"
          ref="autoCompleteElement"
          v-model="phone"
          autocomplete="off"
        />
      </div>
    </div>

    <div>
      <div class="card blue darken-1 br-30">
        <div class="card-content grey-text text-lighten-5 fw-medium">
          <div class="d-flex jc-space-around">
            <h5 class="fw-medium">Wallet Balance</h5>
            <h5>-</h5>
            <h5>
              &#8377;
              {{ balance }}
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import router from "@/router";
import M from "materialize-css";
import store from "../../store";
import db from "../../db";
import users from "@/store/usersCollection";

export default {
  setup() {
    const name = computed(() => store.state.auth.user.name);

    const autoCompleteElement = ref(null);
    const phone = ref("");
    const balance = ref("######");
    const userId = computed(() => store.state.auth.user.id);

    let autoCompleteInstance; // sidenav instance

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

          ac.value.value = "";
          ac.value.blur();
        },
      });
    }
    watch(
      userId,
      () => {
        if (!userId.value) return;
        db.collection("users")
          .doc(userId.value)
          .onSnapshot((doc) => {
            balance.value = doc.data().balance;
          });
      },
      { immediate: true }
    );

    watch(autoCompleteElement, () => {
      initAutocomplete(autoCompleteElement);
    });
    onMounted(() => {
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
      balance,
      name,
      autoCompleteElement,
      phone,
    };
  },
};
</script>

<style lang="scss" scoped>
.input-field {
  background: black;
}

.autocomplete {
  padding-left: 1rem !important;
  border-bottom: none !important;
  box-shadow: none !important;
  color: white;
  &:focus {
    border-bottom: none !important;
  }
}
</style>
