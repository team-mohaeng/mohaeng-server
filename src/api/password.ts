import express, { Router } from "express";
import passwordService from "../service/passwordService";

const router = express.Router();

router.get("/userId/:userId", async (req, res) => {
  const result = await passwordService.user(req.params.userId);

  res.json(result);
});

module.exports = router;