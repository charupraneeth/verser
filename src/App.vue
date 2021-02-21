<template>
  <div>
    <Navbar />
    <router-view class="container" />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
import firebase from "@/firebase";
export default {
  components: {
    Navbar,
  },
  mounted() {
    try {
      // console.log(firebase.messaging());
      firebase
        .messaging()
        .requestPermission()
        .then(() => {
          console.log("notification permission granted");
          return firebase
            .messaging()
            .getToken()
            .then((token) => console.log(token));
        });
    } catch (error) {
      console.log(error.message || "unable to register for notification");
    }
  },
};
</script>
<style lang="scss"></style>
