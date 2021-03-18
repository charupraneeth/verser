import firebase from "@/firebase";
import M from "materialize-css";
import token from "@/store/token";
import router from "@/router";
const messaging = firebase.messaging();
// messaging
//   .requestPermission()
//   .then(() => {
//     M.toast({
//       html: "Notification enabled successfully",
//       classes: "teal",
//     });
//     // console.log("permisson granted");
//     return messaging.getToken();
//   })
//   .then((token) => {
//     console.log(token);
//   })
//   .catch((err) => {
//     console.log(err.message || "failed to get user permission");
//     M.toast({
//       html: err.message || "notifications were not enabled",
//       classes: "red",
//     });

//     M.toast({
//       html: `kindly enable notifications to recieve payments`,
//       classes: "teal",
//     });
//   });
messaging
  .getToken({
    vapidKey:
      "BIDU4PAOAPs9gKAKJUFJmz3NeVebsuzoKvthigcvv8k3TzCTMEMinAAIR1xs3Vw6fmpsv2gNddOWBxEKZ71qKb0",
  })
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      token.value = currentToken;
      // console.log(currentToken);
      M.toast({
        html: "Notification enabled successfully",
        classes: "teal",
      });
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
    M.toast({
      html: err.message || "notifications were not enabled",
      classes: "red",
    });

    M.toast({
      html: `kindly enable notifications to recieve payments`,
      classes: "teal",
    });
  });

messaging.onMessage((payload) => {
  M.toast({ html: "message recieved" });
  const click_action = payload.notification.click_action.split("/");
  const transactionId = click_action[click_action.length - 1];
  router.push(`/dashboard/transaction/${transactionId}`);
  console.log("foreground message ", payload);
});
