"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const courseService_1 = __importDefault(require("../service/courseService"));
const router = express_1.default.Router();
/**
 * @api {get} /api/courses 코스 라이브러리 조회
 *
 * @apiVersion 1.0.0
 * @apiName GetCourses
 * @apiGroup 코스
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "Authorization": "Bearer {jwt}"
 * }
 *
 * @apiSuccess {Object} courses 포함 속성은 하단 코드 참조
 * @apiSuccess {Object} challenges 포함 속성은 하단 코드 참조
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 진행 중인 코스는 뜨지 않고, situation 0 부터 정렬해서 response
 * {
 *  "status": 200,
 *  "data": {
 *    "courses": [
 *      {
 *        "id": 1,
 *        "situation": 0, // 현재 코스 진행 상태
 *        "title": "뽀득뽀득 세균퇴치",
 *        "description": "나 쟈니가 인간세계에 처음 도착했을 때 사람들이 청결에 대해 은근히 무심한 것이 신기했쟈니. 내가 사는 별에서는 상상도 할 수 없쟈니.",
 *        "totalDays": 6, // 코스가 총 며칠짜리 코스인지
 *        "property": "water", // 코스 속성
 *        "challenges": [
 *          {
 *            "id": 1,
 *            "situation": 0, // 챌린지 진행 상태
 *            "description": "손을 씻는 것은 청결에 있어서 가장 기본적이지만 잊기 쉬운 일이쟈니. 깨끗해진 너의 손으로 쟈니를 섬세하게 다뤄줘.",
 *            "year": "", // 챌린지를 완료하면, year month day를 보냄.
 *            "month": "", // 챌린지가 완료되지 않은 상태라면 year, month, day는 ""(빈 문자열)로 response
 *            "day": "",
 *            "currentStamp": 0, // 현재 유저 인증 횟수
 *            "totalStamp": 3, // 인증해야할 총 횟수
 *            "userMents": [ // 수정될 수 있지만, 0번 인덱스는 인증 팝업 멘트 1번 인덱스는 인증 완료 시 하단 멘트
 *              "손톱 밑에도 신경 써서 닦아야 해 세균은 집요하거든. 마치 쟈니처럼",
 *              "세균 따위가 우리 사이를 가로막을 수는 없지. 청결해지기 위한 쟈기의 노력 덕분에 우리의 사이가 더 농밀해졌네? 찡긋"
 *            ]
 *          },
 *          // ...
 *        ]
 *      },
 *      // ...
 *    ]
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
    const result = await courseService_1.default.library(req.body.user.id);
    res.json(result);
});
/**
 * @api {put} /api/courses/:id 코스 진행하기
 *
 * @apiVersion 1.0.0
 * @apiName ChoiceCourse
 * @apiGroup 코스
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "Authorization": "Bearer {jwt}"
 * }
 *
 * @apiSuccess {Object} course 포함 속성은 하단 코드 참조
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 진행하는 코스 하나만 response
 * {
 *  "status": 200,
 *  "data": {
 *    "course": {
 *      "id": 1,
 *      "situation": 1, // 현재 코스 진행 상태
 *      "title": "뽀득뽀득 세균퇴치",
 *      "description": "나 쟈니가 인간세계에 처음 도착했을 때 사람들이 청결에 대해 은근히 무심한 것이 신기했쟈니. 내가 사는 별에서는 상상도 할 수 없쟈니.",
 *      "totalDays": 6, // 코스가 총 며칠짜리 코스인지
 *      "property": "water", // 코스 속성
 *      "challenges": [
 *        {
 *          "id": 1,
 *          "situation": 2, // 챌린지 진행 상태
 *          "description": "손을 씻는 것은 청결에 있어서 가장 기본적이지만 잊기 쉬운 일이쟈니. 깨끗해진 너의 손으로 쟈니를 섬세하게 다뤄줘.",
 *          "year": "2021", // 챌린지를 완료하면, year month day를 보냄.
 *          "month": "07", // 챌린지가 완료되지 않은 상태라면 year, month, day는 ""(빈 문자열)로 response
 *          "day": "03",
 *          "currentStamp": 3, // 현재 유저 인증 횟수
 *          "totalStamp": 3, // 인증해야할 총 횟수
 *          "userMents": [ // 수정될 수 있지만, 0번 인덱스는 인증 팝업 멘트 1번 인덱스는 인증 완료 시 하단 멘트
 *            "손톱 밑에도 신경 써서 닦아야 해 세균은 집요하거든. 마치 쟈니처럼",
 *            "세균 따위가 우리 사이를 가로막을 수는 없지. 청결해지기 위한 쟈기의 노력 덕분에 우리의 사이가 더 농밀해졌네? 찡긋"
 *          ]
 *        },
 *        // ...
 *    }
 *  }
 * }
 *
 * @apiErrorExample Error-Response:
 * 404 코스 아이디 오류
 * {
 *  "status": 404,
 *  "message": "해당 id의 코스가 존재하지 않습니다"
 * }
 */
router.put("/:id", auth_1.default, async (req, res) => {
    const result = await courseService_1.default.progress(req.body.user.id, req.params.id);
    res.json(result);
});
/**
 * @api {get} /api/courses/complete 완료한 코스 메달 조회
 *
 * @apiVersion 1.0.0
 * @apiName GetCompleteCourses
 * @apiGroup 코스
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "Authorization": "Bearer {jwt}"
 * }
 *
 * @apiSuccess {Object} courses 포함 속성은 하단 코드 참조
 * @apiSuccess {Object} challenges 포함 속성은 하단 코드 참조
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 완료한 코스가 있는 경우
 * {
 *  "status": 200,
 *  "data": {
 *    "courses": [
 *      {
 *        "id": 1,
 *        "situation": 2, // 현재 코스 진행 상태
 *        "title": "뽀득뽀득 세균퇴치",
 *        "description": "나 쟈니가 인간세계에 처음 도착했을 때 사람들이 청결에 대해 은근히 무심한 것이 신기했쟈니. 내가 사는 별에서는 상상도 할 수 없쟈니.",
 *        "totalDays": 6, // 코스가 총 며칠짜리 코스인지
 *        "property": "water", // 코스 속성
 *        "challenges": [
 *          {
 *            "id": 1,
 *            "situation": 2, // 챌린지 진행 상태
 *            "description": "손을 씻는 것은 청결에 있어서 가장 기본적이지만 잊기 쉬운 일이쟈니. 깨끗해진 너의 손으로 쟈니를 섬세하게 다뤄줘.",
 *            "year": "2021", // 챌린지를 완료하면, year month day를 보냄.
 *            "month": "07", // 챌린지가 완료되지 않은 상태라면 year, month, day는 ""(빈 문자열)로 response
 *            "day": "03",
 *            "currentStamp": 3, // 현재 유저 인증 횟수
 *            "totalStamp": 3, // 인증해야할 총 횟수
 *            "userMents": [ // 수정될 수 있지만, 0번 인덱스는 인증 팝업 멘트 1번 인덱스는 인증 완료 시 하단 멘트
 *              "손톱 밑에도 신경 써서 닦아야 해 세균은 집요하거든. 마치 쟈니처럼",
 *              "세균 따위가 우리 사이를 가로막을 수는 없지. 청결해지기 위한 쟈기의 노력 덕분에 우리의 사이가 더 농밀해졌네? 찡긋"
 *            ]
 *          },
 *          // ...
 *        ]
 *      },
 *      // ...
 *    ]
 *  }
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 완료한 코스가 없는 경우 -> 에러로 처리 필요하면 말씀해주세요
 * {
 *  "status": 200,
 *  "data": {
 *    "courses": []
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
router.get("/complete", auth_1.default, async (req, res) => {
    const result = await courseService_1.default.medal(req.body.user.id);
    res.json(result);
});
module.exports = router;
//# sourceMappingURL=course.js.map