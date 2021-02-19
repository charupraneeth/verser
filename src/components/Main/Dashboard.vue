<template>
  <div>
    <h1>Dashboard</h1>
    <div>
      <div class="card yellow darken-1">
        <div class="card-content grey-text text-lighten-5 fw-medium">
          <div class="d-flex">
            <span class="card-title fw-medium">wallet balance</span>
            <span> <i class="material-icons">more_vert</i></span>
          </div>
          <p>
            balance : &#8377;
            {{ user.balance }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState("auth", ["user"]),
};
</script>

<style lang="scss" scoped></style>
