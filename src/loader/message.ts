import admin from "firebase-admin";
// import account from "../../journey-admin.json";

let account = require("../../journey-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(account),
});