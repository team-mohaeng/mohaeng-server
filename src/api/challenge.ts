import express, { Router } from "express";
import auth from "../middleware/auth";
import challengeService from "../service/challengeService";

const router = express.Router();

/**
 * @api {get} /api/challenges 진행 중인 코스의 챌린지 지도 조회
 * 
 * @apiVersion 1.0.0
 * @apiName GetChallenges
 * @apiGroup 챌린지
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "Bearer": "{jwt}"
 * }
 * 
 * @apiSuccess {Object} courses 포함 속성은 하단 코드 참조
 * @apiSuccess {Object} challenges 포함 속성은 하단 코드 참조
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "data": {
 *    "course": {
 *      "id": 1,
 *      "situation": 1, // 현재 코스 진행 상태
 *      "title": "뽀득뽀득 세균퇴치",
 *      "description": "나 쟈니가 인간세계에 처음 도착했을 때 사람들이 청결에 대해 은근히 무심한 것이 신기했쟈니. 내가 사는 별에서는 상상도 할 수 없쟈니.",
 *      "totalDays": 6, // 코스가 총 며칠짜리 코스인지
 *      "property": 0, // 코스 속성
 *      "challenges": [
 *        {
 *          "id": 1,
 *          "title": "깨끗하게 손 씻기 3회",
 *          "situation": 1, // 챌린지 진행 상태
 *          "description": "손을 씻는 것은 청결에 있어서 가장 기본적이지만 잊기 쉬운 일이쟈니. 깨끗해진 너의 손으로 쟈니를 섬세하게 다뤄줘.",
 *          "successDescription": "당신은 나에게 한 송이 꽃과 같으니 광합성을 해야만 해. 잠시라도 나와 함께 햇빛을 느껴보겠어?",
 *          "year": "", // 챌린지를 완료하면, year month day를 보냄.
 *          "month": "", // 챌린지가 완료되지 않은 상태라면 year, month, day는 ""(빈 문자열)로 response
 *          "day": "",
 *          "currentStamp": 1, // 현재 유저 인증 횟수
 *          "totalStamp": 2, // 인증해야할 총 횟수
 *          "userMents": [ 
 *            "손톱 밑에도 신경 써서 닦아야 해 세균은 집요하거든. 마치 쟈니처럼",
 *            "세균 따위가 우리 사이를 가로막을 수는 없지. 청결해지기 위한 쟈기의 노력 덕분에 우리의 사이가 더 농밀해졌네? 찡긋"
 *          ]
 *        },
 *        // ...
 *      ]
 *    }
 *  }
 * }
 * 
 * @apiErrorExample Error-Response:
 * 400 진행 중인 코스가 없는 경우
 * {
 *  "status": 400,
 *  "message": "진행 중인 코스가 없습니다."
 * }
 */
router.get("/", auth, async (req, res) => {
  const result = await challengeService.challenges(req.body.user.id);

  res.status(result.status).json(result);
});

/**
 * @api {get} /api/challenges/:courseId 오늘의 챌린지 조회
 * 
 * @apiVersion 1.0.0
 * @apiName TodayChallenge
 * @apiGroup 챌린지
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "Bearer": "{jwt}"
 * }
 * 
 * @apiSuccess {Object} course 포함 속성은 하단 코드 참조
 * @apiSuccess {Object} challenges 포함 속성은 하단 코드 참조
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "data": {
 *    "course": {
 *      "id": 1,
 *      "situation": 1, // 현재 코스 진행 상태
 *      "title": "뽀득뽀득 세균퇴치",
 *      "description": "나 쟈니가 인간세계에 처음 도착했을 때 사람들이 청결에 대해 은근히 무심한 것이 신기했쟈니. 내가 사는 별에서는 상상도 할 수 없쟈니.",
 *      "totalDays": 6, // 코스가 총 며칠짜리 코스인지
 *      "property": 0, // 코스 속성
 *      "challenges": [
 *        { // 오늘 완료한 챌린지가 있다면, situation이 1인 챌린지는 없다
 *          "id": 1,
 *          "title": "깨끗하게 손 씻기 3회",
 *          "situation": 1, // 챌린지 진행 상태
 *          "description": "손을 씻는 것은 청결에 있어서 가장 기본적이지만 잊기 쉬운 일이쟈니. 깨끗해진 너의 손으로 쟈니를 섬세하게 다뤄줘.",
 *          "successDescription": "당신은 나에게 한 송이 꽃과 같으니 광합성을 해야만 해. 잠시라도 나와 함께 햇빛을 느껴보겠어?",
 *          "year": "", // 챌린지를 완료하면, year month day를 보냄.
 *          "month": "", // 챌린지가 완료되지 않은 상태라면 year, month, day는 ""(빈 문자열)로 response
 *          "day": "",
 *          "currentStamp": 2, // 현재 유저 인증 횟수
 *          "totalStamp": 2, // 인증해야할 총 횟수
 *          "userMents": [
 *            "손톱 밑에도 신경 써서 닦아야 해 세균은 집요하거든. 마치 쟈니처럼",
 *            "세균 따위가 우리 사이를 가로막을 수는 없지. 청결해지기 위한 쟈기의 노력 덕분에 우리의 사이가 더 농밀해졌네? 찡긋"
 *          ]
 *        },
 *        // ...
 *      ]
 *    }
 *  }
 * }
 * 
 * @apiErrorExample Error-Response:
 * 404 코스 id가 유효하지 않을 경우
 * {
 *  "status": 404,
 *  "message": "해당 id의 코스가 존재하지 않습니다"
 * }
 * 
 * @apiErrorExample Error-Response:
 * 400 현재 진행 중인 코스가 아닌 경우
 * {
 *  "status": 400,
 *  "message": "현재 진행 중인 코스가 아닙니다."
 * }
 */
router.get("/:courseId", auth, async (req, res) => {
  const result = await challengeService.today(req.body.user.id, req.params.courseId);

  res.status(result.status).json(result);
});

/**
 * @api {put} /api/challenges/:courseId/:challengeId 챌린지 인증하기
 * 
 * @apiVersion 1.0.0
 * @apiName StampChallenge
 * @apiGroup 챌린지
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "Bearer": "{jwt}"
 * }
 * 
 * @apiSuccess {Object} course 포함 속성은 하단 코드 참조
 * @apiSuccess {Object} challenges 포함 속성은 하단 코드 참조
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "data": {
 *    "course": {
 *      "id": 1,
 *      "situation": 1, // 현재 코스 진행 상태
 *      "title": "뽀득뽀득 세균퇴치",
 *      "description": "나 쟈니가 인간세계에 처음 도착했을 때 사람들이 청결에 대해 은근히 무심한 것이 신기했쟈니. 내가 사는 별에서는 상상도 할 수 없쟈니.",
 *      "totalDays": 6, // 코스가 총 며칠짜리 코스인지
 *      "property": 0, // 코스 속성
 *      "challenges": [
 *        { // 오늘 완료한 챌린지가 있다면, situation이 1인 챌린지는 없다
 *          "id": 1,
 *          "title": "깨끗하게 손 씻기 3회",
 *          "situation": 1, // 챌린지 진행 상태
 *          "description": "손을 씻는 것은 청결에 있어서 가장 기본적이지만 잊기 쉬운 일이쟈니. 깨끗해진 너의 손으로 쟈니를 섬세하게 다뤄줘.",
 *          "successDescription": "당신은 나에게 한 송이 꽃과 같으니 광합성을 해야만 해. 잠시라도 나와 함께 햇빛을 느껴보겠어?",
 *          "year": "", // 챌린지를 완료하면, year month day를 보냄.
 *          "month": "", // 챌린지가 완료되지 않은 상태라면 year, month, day는 ""(빈 문자열)로 response
 *          "day": "",
 *          "currentStamp": 2, // 현재 유저 인증 횟수
 *          "totalStamp": 2, // 인증해야할 총 횟수
 *          "userMents": [ 
 *            "손톱 밑에도 신경 써서 닦아야 해 세균은 집요하거든. 마치 쟈니처럼",
 *            "세균 따위가 우리 사이를 가로막을 수는 없지. 청결해지기 위한 쟈기의 노력 덕분에 우리의 사이가 더 농밀해졌네? 찡긋"
 *          ]
 *        },
 *        // ...
 *      ]
 *    }
 *  }
 * }
 * 
 * @apiErrorExample Error-Response:
 * 404 코스(챌린지) id가 유효하지 않을 경우
 * {
 *  "status": 404,
 *  "message": "해당 id의 코스(챌린지)가 존재하지 않습니다"
 * }
 * 
 * @apiErrorExample Error-Response:
 * 400 현재 진행 중인 코스(챌린지)가 아닌 경우
 * {
 *  "status": 400,
 *  "message": "현재 진행 중인 코스(챌린지)가 아닙니다."
 * }
 */
router.put("/:courseId/:challengeId", auth, async (req, res) => {
  const result = await challengeService.stamp(req.body.user.id, req.params.courseId, req.params.challengeId);

  res.status(result.status).json(result);
});

module.exports = router;