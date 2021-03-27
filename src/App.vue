<template>
  <div class="main-container">
    <Navbar />
    <div class="container sidenav-padding">
      <router-view />
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
// import firebase from "@/firebase";
export default {
  components: {
    Navbar,
  },
  mounted() {},
};
</script>
<style lang="scss"></style>
