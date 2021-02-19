<template>
  <Register v-if="!isLoggedIn || !user" />
  <Dashboard v-else />
</template>

<script>
// @ is an alias to /src
import Register from "@/components/Register.vue";
import Dashboard from "@/components/Main/Dashboard.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Register,
    Dashboard,
  },
  computed: mapState("auth", ["user", "isLoggedIn"]),
};
</script>
