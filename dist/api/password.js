"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passwordService_1 = __importDefault(require("../service/passwordService"));
const router = express_1.default.Router();
router.get("/userId/:userId", async (req, res) => {
    const result = await passwordService_1.default.user(req.params.userId);
    res.json(result);
});
module.exports = router;
//# sourceMappingURL=password.js.map