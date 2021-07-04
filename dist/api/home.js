"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const homeService_1 = __importDefault(require("../service/homeService"));
const router = express_1.default.Router();
/**
 * @api {get} /api/home 메인홈
 *
 * @apiVersion 1.0.0
 * @apiName Home
 * @apiGroup Main
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "Authorization": "Bearer {jwt}"
 * }
 *
 * @apiSuccess {Number} situation
 * @apiSuccess {Number} affinity
 * @apiSuccess {Object} course
 * @apiSuccess {String} title 코스 제목
 * @apiSuccess {String} property 코스 속성
 * @apiSuccess {Object} challenge
 * @apiSuccess {Number} day 챌린지 n일차
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 챌린지 진행 전
 * {
 *  "status": 200,
 *  "data": {
 *    "situation": 0,
 *    "affinity": 0
 *  }
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 챌린지 진행 중
 * {
 *  "status": 200,
 *  "data": {
 *    "situation": 1,
 *    "affinity": 70,
 *    "course": {
 *      "title": "뽀득뽀득 세균 퇴치",
 *      "property": "water",
 *    },
 *    "challenge": {
 *      "day": 2
 *    }
 *  }
 * }
 *
 * @apiErrorExample Error-Response:
 * 403 만료된 토큰
 * {
 *  "status": 403,
 *  "message": "만료된 토큰입니다. 우리 아기 고앵이 토큰 하나 더 받아와 쪽-"
 * }
 */
router.get("/", auth_1.default, async (req, res) => {
    const result = await homeService_1.default.home(req.body.user.id);
    res.json(result);
});
module.exports = router;
//# sourceMappingURL=home.js.map