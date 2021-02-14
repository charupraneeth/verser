<template>
  <div>
    <h1>Verify Phone</h1>
    <div>
      <div class="field">
        <label for="phone" class="label">Phone</label>
        <div class="control">
          <input
            v-model="phone"
            id="phone"
            name="phone"
            class="input"
            type="tel"
            placeholder="912345678"
            @keypress.enter="sendOtp"
          />
        </div>
      </div>
    </div>
    <!-- <div id="recaptcha"></div> -->
    <div class="control">
      <button id="recaptcha-trigger" class="button is-primary">
        send otp
      </button>
    </div>

    <div v-if="isOtpSent">
      <div class="field">
        <label for="phone" class="label">OTP</label>
        <div class="control">
          <input
            v-model="otp"
            id="otp"
            name="otp"
            class="input"
            type="text"
            placeholder="XXXXXX"
            @keypress.enter="verifyOtp"
          />
        </div>
      </div>
      <div class="control">
        <button @click="verifyOtp" class="button is-primary">verify otp</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase";
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
        console.log(phone);
        // const confirmationResult = await firebase
        //   .auth()
        //   .signInWithPhoneNumber(phone, window.recaptchaVerifier);

        const confirmationResult = await firebase
          .auth()
          .currentUser.linkWithPhoneNumber(phone, window.recaptchaVerifier);
        // console.log(confirmationResult);
        this.confirmationResult = confirmationResult;
        console.log("otp sent");
      } catch (error) {
        console.log(error);
      }
    },

    // verify otp function
    async verifyOtp() {
      console.log(this.confirmationResult);
      const result = await this.confirmationResult.confirm(this.otp);
      console.log(result);
      console.log("otp verified");
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
          that.sendOtp();
        },
        "expired-callback": () => {
          console.log("captcha expired");
        },
      }
    );
    window.recaptchaVerifier.render();
  },
};
</script>
