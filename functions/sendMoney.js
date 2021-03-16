exports.handler = async (event, context) => {
  // console.log(event);
  const axios = require("axios");
  const admin = require("firebase-admin");
  const serviceAccount = require("./safepe-d8e02-firebase-adminsdk-yhzpc-231b49ab44.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const db = admin.firestore();
  const { to, from, amount, name } = JSON.parse(event.body);
  try {
    const transactionRef = await db.collection("transactions").add({
      to,
      from,
      amount: parseInt(amount),
      created: admin.firestore.Timestamp.now(),
    });
    const id = transactionRef.id;
    const details = (await transactionRef.get()).data();
    details.id = id;
    console.log(details);

    // sending a notification to the sender
    const URL = "https://fcm.googleapis.com/fcm/send";
    const data = {
      to: event.queryStringParameters.token,
      notification: {
        body: "Amount : " + amount,
        title: "payment from " + name,
        click_action: "/#/dashboard/transaction/" + id,
      },
    };
    const config = {
      headers: {
        Authorization: `key=${process.env.VUE_APP_FIREBASE_MESSAGING_SERVER_KEY}`,
        "Content-Type": "application/json",
      },
    };
    // const response = await axios.post(URL, data, config);
    // console.log("response", response);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "successful",
        transaction: details,
      }),
    };
  } catch (error) {
    console.log("err", error);
    return {
      statusCode: 400,
      body: error,
    };
  }
};
