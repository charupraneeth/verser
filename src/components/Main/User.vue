<template>
  <div>
    <!-- <pre>{{ userState }}</pre> -->
    <div class="progress" v-if="userState.loading">
      <div class="indeterminate"></div>
    </div>
    <div class="card" v-else>
      <div class="card-image">
        <img :src="userState.data.photo" class="responsive-img avatar m-auto" />
      </div>
      <div class="card-content">
        <p class="card-title">{{ userState.data.name }}</p>
        <p>{{ userState.data.phone }}</p>
        <p>{{ userState.data.email }}</p>
      </div>
      <div class="card-action">
        <a class="waves-effect waves-light btn"
          ><i class="material-icons">account_balance</i> pay</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import useUser from "@/hooks/useUser";
// import { computed } from "vue";
// import M from "materialize-css";
export default {
  props: ["phone"],
  setup(props) {
    const userState = useUser(props);
    return {
      userState,
    };
  },
};
</script>

<style lang="scss" scoped></style>
