import express, { Router } from "express";
import User from "../models/User";

const router = express.Router();

router.get("/", async(req, res) => {
  let tokens: Array<String> = new Array<String>();
  const users = await User.find().select({ _id: 0, id: 1 });

  users.forEach((user) => {
    tokens.push(user.id);
  });

  res.json(tokens);
})

module.exports = router;