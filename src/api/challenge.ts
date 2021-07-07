import express, { Router } from "express";
import auth from "../middleware/auth";
import challengeService from "../service/challengeService";

const router = express.Router();

router.get("/:courseId/:challengeId", auth, async (req, res) => {
  const result = await challengeService.today(req.body.user.id, req.params.courseId, req.params.challengeId);

  res.json(result);
});

module.exports = router;