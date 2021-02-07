<template>
  <div class="mw-800 px-3">
    <!-- <h1>This is a dashboard</h1> -->
    <div class="mt-3" v-if="message">
      <div class="notification is-primary" v-if="message">
        <button @click="message = ''" class="delete"></button>
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
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
