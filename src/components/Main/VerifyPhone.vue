<template>
  <div>
    <h1>Verify Phone</h1>
    <div>
      <div class="field">
        <label for="phone" class="label">Phone</label>
        <div class="control">
          <input
            id="phone"
            name="phone"
            class="input"
            type="tel"
            placeholder="912345678"
            :disabled="isOtpSent"
            @keypress.enter="sendOtp"
          />
        </div>
      </div>
      <div class="control">
        <button @click="sendOtp" class="button is-primary">send otp</button>
      </div>
    </div>

    <div v-if="isOtpSent">
      <div class="field">
        <label for="phone" class="label">OTP</label>
        <div class="control">
          <input
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
export default {
  data: () => {
    return {
      isOtpSent: false,
    };
  },
  methods: {
    sendOtp() {
      this.isOtpSent = true;
      console.log("otp sent");
    },
    verifyOtp() {
      console.log("otp verified");
    },
  },
};
</script>
