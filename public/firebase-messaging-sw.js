importScripts("https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js");
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBHk4O1yyz67UyWdPBjN0_7iOJ3I18hx2M",
  authDomain: "safepe-d8e02.firebaseapp.com",
  projectId: "safepe-d8e02",
  storageBucket: "safepe-d8e02.appspot.com",
  messagingSenderId: "580336241671",
  appId: "1:580336241671:web:b582f252b97f7b341beea2",
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically
// and you should use data messages for custom notifications.
// For more info see:
// https://firebase.google.com/docs/cloud-messaging/concept-options
messaging.onBackgroundMessage(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./favicon.ico",
    // data: { url: payload.data.click_action },
    // actions: [{ action: "open_url", title: "Read Now" }],
  };
  const priority = "high";
  self.registration.showNotification(
    notificationTitle,
    notificationOptions,
    priority
  );
});
