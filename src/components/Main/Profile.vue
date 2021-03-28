<template>
  <div class="row">
    <div class="col s12">
      <h4>Profile</h4>
      <div class="card black white-text br-30 pt-16">
        <div class="card-image">
          <img
            class="responsive-img avatar m-auto"
            :src="user.photo"
            :alt="user.name + '\'s photo'"
          />
        </div>
        <div class="card-content">
          <p><b>Name : </b>{{ user.name }}</p>
          <p><b>Email : </b>{{ user.email }}</p>
          <p v-if="user.phone"><b>Phone : </b>{{ user.phone }}</p>
          <p v-else>
            <b>Phone : </b>
            <router-link to="verify-phone">click to verify</router-link>
          </p>
          <time><b>Created at : </b>{{ user.created_at }}</time>
        </div>
        <!-- <div class="card-action">
            <a href="#">This is a link</a>
          </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState("auth", ["user", "isLoggedIn"]),
};
</script>

<style lang="scss" scoped></style>
