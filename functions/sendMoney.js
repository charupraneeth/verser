const axios = require("axios");
require("dotenv").config();
exports.handler = async (event, context) => {
  try {
    const URL = "https://fcm.googleapis.com/fcm/send";
    const data = {
      to: event.queryStringParameters.token,
      notification: {
        sound: "default",
        body: "test body",
        title: "test title",
        content_available: true,
        priority: "high",
        click_action: "https://google.com",
      },
      webpush: {
        notification: {
          requireInteraction: true,
          // icon: '/icons/notification.png'
        },
        fcm_options: {
          link: "https://google.com",
        },
      },
    };
    const config = {
      headers: {
        Authorization: `key=${process.env.VUE_APP_FIREBASE_MESSAGING_SERVER_KEY}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(URL, data, config);
    // console.log("response", response);
    return {
      statusCode: 200,
      body: "notification sent",
    };
  } catch (error) {
    console.log("err", error);
    return {
      statusCode: 400,
      body: "fails to send notification",
    };
  }
};
