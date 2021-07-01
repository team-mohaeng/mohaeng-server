import admin from "firebase-admin";
import express from "express";
import config from "../config";

const router = express.Router();

router.get("/", async(req, res) => {
  try {
    let deviceToken = config.deviceToken;

    let message = {
      data: {
        title: '쟈기',
        body: '쟈니..?',
      },
      token: deviceToken,
    };
  
    admin
      .messaging()
      .send(message)
      .then(function (response) {
        console.log('Successfully sent message: : ', response);
      })
      .catch(function (err) {
        console.log('Error Sending message!!! : ', err);
      })
  } catch (error) {
    console.error(error.message);
  }
});