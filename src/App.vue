<template>
  <div>
    <Navbar />
    <router-view class="container" />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
export default {
  components: {
    Navbar,
  },
};
</script>
<style lang="scss"></style>
