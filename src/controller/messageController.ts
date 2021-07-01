import admin from "firebase-admin";

export default {
  pushAlarm: async (req, res) => {
    let deviceToken = 'fcm Token';

    let message = {
      notification: {
        title: '쟈기',
        body: '쟈니..?',
      },
      token: deviceToken,
    };

    admin.messaging()
        .send(message)
        .then(function (response) {
          console.log('Successfully sent message::', response);
          return res.status(200).message("SUCCESS")
        })
        .catch(function (err) {
          console.log('Error Sending message!!! : ', err);
          return res.status(400).message("FAIL");
        });
  }
}