import express, { Router } from "express";
import { check, validationResult } from "express-validator";
import auth from "../middleware/auth";
import homeService from "../service/homeService";

const router = express.Router();

router.get("/", auth, async(req, res) => {
  const result = await homeService.home(req.body.user.id);

  res.json(result);
});

module.exports = router;