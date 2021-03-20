<template>
  <div>
    <h4>Dashboard</h4>
    <div>
      <div class="card yellow darken-1">
        <div class="card-content grey-text text-lighten-5 fw-medium">
          <div class="d-flex">
            <span class="card-title fw-medium">wallet balance</span>
            <span> <i class="material-icons">more_vert</i></span>
          </div>
          <p>
            balance : &#8377;
            {{ balance }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import store from "../../store";
import db from "../../db";

export default {
  setup() {
    const balance = ref("######");
    const userId = computed(() => store.state.auth.user.id);
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
    return {
      balance,
    };
  },
};
</script>

<style lang="scss" scoped></style>
