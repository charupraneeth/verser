<template>
  <div>
    <h1>Verify Phone</h1>
    <div>
      <div class="input-field col s6">
        <i class="material-icons prefix">phone</i>
        <input v-model="phone" id="phone" type="tel" class="validate" />
        <label for="phone">Telephone</label>
      </div>
      <div class="input-field">
        <button id="recaptcha-trigger" class="waves-effect waves-light btn">
          send otp
        </button>
      </div>
      <div class="input-field col s6" v-if="isOtpSent">
        <i class="material-icons prefix">vpn_key</i>
        <input
          v-model="otp"
          id="otp"
          type="text"
          class="validate"
          placeholder="XXXXXX"
        />
        <button @click="verifyOtp" class="waves-effect waves-light btn">
          verify otp
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/db";
import firebase from "@/firebase";
import M from "materialize-css";
import store from "@/store";
export default {
  data: () => {
    return {
      otp: "",
      isOtpSent: false,
      phone: "",
      captchaSolved: false,
      confirmationResult: "",
    };
  },
  methods: {
    // sending otp function
    async sendOtp() {
      try {
        this.isOtpSent = true;
        const phone = "+91" + this.phone;
        // const confirmationResult = await firebase
        //   .auth()
        //   .signInWithPhoneNumber(phone, window.recaptchaVerifier);

        const confirmationResult = await firebase
          .auth()
          .currentUser.linkWithPhoneNumber(phone, window.recaptchaVerifier);
        // console.log(confirmationResult);
        this.confirmationResult = confirmationResult;
        M.toast({ html: "OTP sent!", classes: "teal" });
      } catch (error) {
        console.log(error);
        M.toast({
          html: error.message || "failed to send OTP",
          classes: "red",
        });
      }
    },

    // verify otp function
    async verifyOtp() {
      try {
        // console.log(this.confirmationResult);
        await this.confirmationResult.confirm(this.otp);
        // console.log(result);
        console.log("otp verified");
        M.toast({ html: "OTP verfied !", classes: "teal" });
        store.commit("auth/setPhone", "+91" + this.phone);
        await db
          .collection("users")
          .doc(store.state.auth.user.id)
          .update({
            phone: "+91" + this.phone,
          });
        store.dispatch("auth/logout");
        M.toast({ html: "signin again to get started" });
      } catch (error) {
        M.toast({
          html: error.message || "failed to verify OTP ",
          classes: "red",
        });
      }
    },
  },

  // adding the recaptcha widget on mount
  mounted() {
    const that = this;
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-trigger",
      {
        size: "invisible",
        callback: () => {
          console.log("captcha solved", that);
          M.toast({ html: "Captcha solved !", classes: "teal" });
          that.sendOtp();
        },
        "expired-callback": () => {
          console.log("captcha expired");
          M.toast({ html: "Captcha expired", classes: "red" });
        },
      }
    );
    window.recaptchaVerifier.render();
  },
};
</script>
