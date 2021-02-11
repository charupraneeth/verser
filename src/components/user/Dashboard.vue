<template>
  <div class="mw-800 px-3">
    <h1>Dashboard</h1>
  </div>
</template>

<script>
import User from "@/components/User.vue";
import { ref } from "vue";
export default {
  components: {
    User,
  },
  setup() {
    const message = ref("welcome to the dashboard");
    return {
      message,
    };
  },
};
</script>

<style lang="scss" scoped>
.mw-800 {
  max-width: 800px;
  margin: 0 auto;
}
</style>
