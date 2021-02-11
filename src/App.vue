<template>
  <div class="container">
    <div>
      <Navbar />
      <router-view />
    </div>
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
