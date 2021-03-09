<template>
  <div>
    <!-- <pre>{{ userState }}</pre> -->
    <div class="progress" v-if="userState.loading">
      <div class="indeterminate"></div>
    </div>
    <div class="card user-card" v-else>
      <div class="card-image">
        <img :src="userState.data.photo" class="responsive-img avatar m-auto" />
      </div>
      <div class="card-content mw-200px m-auto">
        <p class="card-title">{{ userState.data.name }}</p>
        <p>{{ userState.data.phone }}</p>
        <p>{{ userState.data.email }}</p>
      </div>
      <div class="card-action center">
        <a
          class="waves-effect waves-light btn"
          @click="sendMoney(userState.data.token)"
          ><i class="material-icons">account_balance</i> pay</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import useUser from "@/hooks/useUser";
// import M from "materialize-css";
// import { computed } from "vue";
export default {
  props: ["phone"],
  setup(props) {
    const userState = useUser(props);
    async function sendMoney(token) {
      console.log(token);
      const response = await fetch(
        `/.netlify/functions/sendMoney?token=${token}`
      );
      console.log(response);
    }
    return {
      userState,
      sendMoney,
    };
  },
};
</script>

<style lang="scss" scoped></style>
