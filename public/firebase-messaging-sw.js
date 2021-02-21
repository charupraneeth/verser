// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

try {
  // Initialize the Firebase app in the service worker by passing the generated config
  const firebaseConfig = {
    apiKey: "AIzaSyBHk4O1yyz67UyWdPBjN0_7iOJ3I18hx2M",
    authDomain: "safepe-d8e02.firebaseapp.com",
    projectId: "safepe-d8e02",
    storageBucket: "safepe-d8e02.appspot.com",
    messagingSenderId: "580336241671",
    appId: "1:580336241671:web:b582f252b97f7b341beea2",
  };

  firebase.initializeApp(firebaseConfig);

  // Retrieve firebase messaging
  const messaging = firebase.messaging();

  messaging.setBackgroundMessageHandler(function(payload) {
    const title = payload.data.username;
    let iconpath = "";

    const options = {
      body: payload.data.message,
      icon: "public/favicon.ico",
    };

    return self.registration.showNotification(title, options);
  });
  // messaging.onBackgroundMessage(function(payload) {
  //   console.log("Received background message ", payload);

  //   const notificationTitle = payload.notification.title;
  //   const notificationOptions = {
  //     body: payload.notification.body,
  //   };

  //   self.registration.showNotification(notificationTitle, notificationOptions);
  // });
} catch (error) {
  console.log(error);
}
