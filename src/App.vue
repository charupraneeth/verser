<template>
  <div class="main-container">
    <div class="wave">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#1E88E5"
          fill-opacity="1"
          d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
    <div class="overlay">
      <h4>Verser</h4>
    </div>
    <Navbar />
    <div class="container sidenav-padding">
      <router-view v-if="token" />
      <div v-else>
        <h3>Please enable notifications to continue</h3>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
import token from "./store/token";

export default {
  components: {
    Navbar,
  },
  data: () => ({
    token,
  }),
};
</script>
<style lang="scss">
.wave {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: black;
  opacity: 1;
  color: white;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fade-top 5s 0.8s cubic-bezier(0.44, 0.18, 0.46, 0.98) 1 forwards;
}
// .overlay h4 {
//   animation: fadeout 1.2s 0.5s ease-in 1 forwards;
// }
// @keyframes fade-out {
//   from {
//     background: black;
//   }
//   to{
//     background: transparent;
//     z-index: -100;
//   }
// }
@keyframes fadeout {
  from {
    background: black;
  }
  to {
    background: none;
    z-index: -100;
    display: none;
    opacity: 0.2;
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
