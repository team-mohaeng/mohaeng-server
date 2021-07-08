"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const challengeService_1 = __importDefault(require("../service/challengeService"));
const router = express_1.default.Router();
router.get("/", auth_1.default, async (req, res) => {
    const result = await challengeService_1.default.challenges(req.body.user.id);
    res.json(result);
});
router.get("/:courseId/:challengeId", auth_1.default, async (req, res) => {
    const result = await challengeService_1.default.today(req.body.user.id, req.params.courseId, req.params.challengeId);
    res.json(result);
});
router.put("/:courseId/:challengeId", auth_1.default, async (req, res) => {
    const result = await challengeService_1.default.stamp(req.body.user.id, req.params.courseId, req.params.challengeId);
    res.json(result);
});
module.exports = router;
//# sourceMappingURL=challenge.js.map