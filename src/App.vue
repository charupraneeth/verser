<template>
  <div>
    <Navbar />
    <router-view class="container" />
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
