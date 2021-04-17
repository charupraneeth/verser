<template>
  <div class="row">
    <div class="col s12">
      <h4>Profile</h4>
      <div class="card black-text white br-30 pt-16">
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
            <router-link to="verify-phone">Click to verify</router-link>
          </p>
          <time><b>Created at : </b>{{ user.created_at }}</time>
        </div>
        <!-- <div class="card-action">
            <a href="#">This is a link</a>
          </div> -->
        <div class="qr-code-wrapper center">
          <div>
            <qrcode-vue
              :value="
                `https://verser.netlify.app/#/dashboard/user/${user.phone.substr(
                  1
                )}`
              "
              :size="200"
            ></qrcode-vue>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import QrcodeVue from "qrcode.vue";
export default {
  computed: mapState("auth", ["user", "isLoggedIn"]),
  components: {
    QrcodeVue,
  },
};
</script>

<style lang="scss" scoped></style>
