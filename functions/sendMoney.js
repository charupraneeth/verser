exports.handler = async (event, context) => {
  const { google } = require("googleapis");
  const MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
  const SCOPES = [MESSAGING_SCOPE];

  function getAccessToken() {
    return new Promise(function(resolve, reject) {
      const key = require("./safepe-d8e02-firebase-adminsdk-yhzpc-231b49ab44.json");
      const jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        SCOPES,
        null
      );
      jwtClient.authorize(function(err, tokens) {
        if (err) {
          reject(err);
          return;
        }
        resolve(tokens.access_token);
      });
    });
  }
  const axios = require("axios");
  const admin = require("firebase-admin");
  const serviceAccount = require("./safepe-d8e02-firebase-adminsdk-yhzpc-231b49ab44.json");

  // to prevent app from duplicate initializations
  if (!admin.apps.length)
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

  const db = admin.firestore();
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
          message: "Yaay Your Transaction was Successful!",
        }),
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: error.message || "Your Transaction Failed",
        }),
      };
    }
  }

  // else if status is pending
  else {
    // try to  add transaction to db
    let transactionRef;
    try {
      transactionRef = await db.collection("transactions").add({
        to,
        from,
        amount: parseInt(amount),
        created: admin.firestore.Timestamp.now(),
        status,
      });
      const id = transactionRef.id;
      const details = (await transactionRef.get()).data();
      details.id = id;

      // legacy code : //

      /* const URL = "https://fcm.googleapis.com/fcm/send";
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
      }; */

      // sending a notification to the reciever

      const URL =
        "https://fcm.googleapis.com/v1/projects/safepe-d8e02/messages:send";
      const accessToken = await getAccessToken();
      console.log("access token : ", accessToken);

      const data = {
        message: {
          token: event.queryStringParameters.token,
          data: {
            id: id,
            body: "data body",
            title: "data title",
          },
          notification: {
            body: "Amount : " + amount,
            title: "payment from " + from.name,
          },
          webpush: {
            data: {
              body: "Amount : " + amount,
              title: "payment from " + from.name,
            },
            fcmOptions: {
              link: "/#/dashboard/transaction/" + id,
            },
          },
          name: "VERCER NOTIFICATION",
        },
      };
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken.trim()}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      await axios.post(URL, data, config);
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "transaction successfully initiated",
          transaction: details,
          failed: false,
        }),
      };
    } catch (error) {
      // if adding transaction fails

      // remove transaction from db
      transactionRef.delete();
      console.log("err : ", error.message, "\nend");
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: error.message || "failed notifying the reciever, try again",
          failed: true,
        }),
      };
    }
  }
};
