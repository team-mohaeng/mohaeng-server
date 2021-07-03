"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const homeService_1 = __importDefault(require("../service/homeService"));
const router = express_1.default.Router();
router.get("/", auth_1.default, async (req, res) => {
    const result = await homeService_1.default.home(req.body.user.id);
    res.json(result);
});
module.exports = router;
//# sourceMappingURL=home.js.map