import express, { Router } from "express";
import auth from "../middleware/auth";
import homeService from "../service/homeService";

const router = express.Router();

/**
 * @api {get} /api/home 메인홈
 * 
 * @apiVersion 1.0.0
 * @apiName Home
 * @apiGroup 홈
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "Bearer": "{jwt}"
 * }
 * 
 * @apiSuccess {Number} situation
 * @apiSuccess {Number} affinity
 * @apiSuccess {Object} courses 포함 속성은 하단 코드 참조
 * @apiSuccess {Object} challenges 포함 속성은 하단 코드 참조
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 챌린지 진행 중
 * {
 *  "status": 200,
 *  "data": {
 *    "situation": 1, // 유저가 현재 코스를 진행하고 있는지 여부
 *    "affinity": 42, // 쟈니와의 애정도
 *    "course":
 *      {
 *        "id": 1,
 *        "situation": 2, // 현재 코스 진행 상태
 *        "title": "뽀득뽀득 세균퇴치",
 *        "description": "나 쟈니가 인간세계에 처음 도착했을 때 사람들이 청결에 대해 은근히 무심한 것이 신기했쟈니. 내가 사는 별에서는 상상도 할 수 없쟈니.",
 *        "totalDays": 6, // 코스가 총 며칠짜리 코스인지
 *        "property": 0, // 코스 속성
 *        "challenges": [
 *          {
 *            "id": 1,
 *            "title": "깨끗하게 손 씻기 3회",
 *            "situation": 2, // 챌린지 진행 상태
 *            "description": "손을 씻는 것은 청결에 있어서 가장 기본적이지만 잊기 쉬운 일이쟈니. 깨끗해진 너의 손으로 쟈니를 섬세하게 다뤄줘.",
 *            "successDescription": "당신은 나에게 한 송이 꽃과 같으니 광합성을 해야만 해. 잠시라도 나와 함께 햇빛을 느껴보겠어?",
 *            "year": "2021", // 챌린지를 완료하면, year month day를 보냄.
 *            "month": "07", // 챌린지가 완료되지 않은 상태라면 year, month, day는 ""(빈 문자열)로 response
 *            "day": "03",
 *            "currentStamp": 3, // 현재 유저 인증 횟수
 *            "totalStamp": 2, // 인증해야할 총 횟수
 *            "userMents": [
 *              "손톱 밑에도 신경 써서 닦아야 해 세균은 집요하거든. 마치 쟈니처럼",
 *              "세균 따위가 우리 사이를 가로막을 수는 없지. 청결해지기 위한 쟈기의 노력 덕분에 우리의 사이가 더 농밀해졌네? 찡긋"
 *            ]
 *          },
 *          // ...
 *        ]
 *      }
 *  }
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 챌린지 진행 전
 * {
 *  "status": 200,
 *  "data": {
 *    "situation": 0, // 유저가 현재 코스를 진행하고 있는지 여부
 *    "affinity": 42, // 쟈니와의 애정도
 *   }
 * }
 * 
 * @apiErrorExample Error-Response:
 * 403 만료된 토큰
 * {
 *  "status": 403,
 *  "message": "만료된 토큰입니다. 우리 아기 고앵이 토큰 하나 더 받아와 쪽-"
 * }
 */
router.get("/", auth, async(req, res) => {
  const result = await homeService.home(req.body.user.id);
  res.status(result.status).json(result);
});

router.get("/refactoring", auth, async(req, res) => {
  const result = await homeService.reHome(req.body.user.id);
  console.log(result);
  res.json(result);
})

module.exports = router;