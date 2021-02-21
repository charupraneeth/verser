import firebase from "@/firebase";
import M from "materialize-css";

const messaging = firebase.messaging();
messaging
  .requestPermission()
  .then(() => {
    M.toast({
      html: "Notification enabled successfully",
      classes: "teal",
    });
    // console.log("permisson granted");
    return messaging.getToken();
  })
  .then((token) => {
    console.log(token);
  })
  .catch((err) => {
    console.log(err.message || "failed to get user permission");
    M.toast({
      html: err.message || "notifications were not enabled",
      classes: "red",
    });

    M.toast({
      html: `kindly enable notifications to recieve payments`,
      classes: "teal",
    });
  });
