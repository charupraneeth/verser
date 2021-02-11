<template>
  <slot name="user" :user="user"></slot>
</template>

<script>
import { ref, onUnmounted } from "vue";
import { auth } from "@/firebase";

export default {
  setup() {
    const user = ref(null);
    const unsubscribe = auth.onAuthStateChanged(
      (firebaseUser) => (user.value = firebaseUser)
    );
    onUnmounted(() => {
      unsubscribe();
    });
    return {
      user,
      unsubscribe,
    };
  },
};
</script>
