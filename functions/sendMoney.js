exports.handler = async (event, context) => {
  const axios = require("axios");
  const admin = require("firebase-admin");
  const serviceAccount = require("./safepe-d8e02-firebase-adminsdk-yhzpc-231b49ab44.json");

  // to prevent app from duplicate initializations
  if (!admin.apps.length)
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

  const db = admin.firestore();
  console.log(event);
  // extracting transaction creadentials from request body
  const { to, from, amount, status } = JSON.parse(event.body);

  // if status is succesful => transaction is completed
  if (status == "successful") {
    try {
      const increment = admin.firestore.FieldValue.increment(amount);
      const decrement = admin.firestore.FieldValue.increment(-amount);

      // regulate balance for sender and reciever
      db.collection("users")
        .doc(to.id)
        .update({ balance: increment });
      db.collection("users")
        .doc(from.id)
        .update({ balance: decrement });

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "successful",
        }),
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: error.message || "failed",
        }),
      };
    }
  }

  // else if status is pending
  else {
    // try to  add transaction to db
    try {
      const transactionRef = await db.collection("transactions").add({
        to,
        from,
        amount: parseInt(amount),
        created: admin.firestore.Timestamp.now(),
        status,
      });
      const id = transactionRef.id;
      const details = (await transactionRef.get()).data();
      details.id = id;

      // sending a notification to the reciever
      const URL = "https://fcm.googleapis.com/fcm/send";
      const data = {
        to: event.queryStringParameters.token,
        notification: {
          body: "Amount : " + amount,
          title: "payment from " + from.name,
          click_action: "/#/dashboard/transaction/" + id,
          data: { id: id },
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
        body: JSON.stringify({
          message: "transaction successfully initiated",
          transaction: details,
        }),
      };
    } catch (error) {
      // if adding transaction fails
      console.log("err", error);
      return {
        statusCode: 400,
        body: error,
      };
    }
  }
};
