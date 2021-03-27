<template>
  <div class="main-container">
    <div class="overlay">
      <h4>Vercer</h4>
    </div>
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
<style lang="scss">
.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: black;
  color: white;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fade-out 1.2s 0.5s ease-in 1 forwards;
}
.overlay h4 {
  animation: fade-top 1s 0.5s ease-in-out 1 forwards;
}
@keyframes fade-out {
  from {
    background: black;
  }
  to {
    background: tr;
  }
}
@keyframes fade-top {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-900%);
  }
}
</style>
