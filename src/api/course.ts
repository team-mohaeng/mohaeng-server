import express, { Router } from "express";
import auth from "../middleware/auth";
import courseService from "../service/courseService";

const router = express.Router();

/**
 * @api {get} /api/courses 코스 라이브러리 조회 (코스 전체 조회)
 * 
 * @apiVersion 1.0.0
 * @apiName GetCourses
 * @apiGroup Course
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "Authorization": "Bearer {jwt}"
 * }
 * 
 * @apiSuccess {Number} id
 * @apiSuccess {Number} situation
 * @apiSuccess {String} title
 * @apiSuccess {String} description
 * @apiSuccess {Number} totalDays
 * @apiSuccess {String} property
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 조회 성공
 * {
 *  "status": 200,
 *  "data": {
 *      "course": [
 *          {
 *              "id": 2,
 *              "situation": 0,
 *              "title": "뽀득뽀득 세균퇴치",
 *              "description": "나 쟈니가 인간세계에 처음 도착했을 때 사람들이 청결에 대해 은근히 무심한 것이 신기했쟈니. 내가 사는 별에서는 상상도 할 수 없쟈니.",
 *              "totalDays": 6,
 *              "property": "water"
 *          },
 *        // ...
 *      ]
 *    }
 * }
 * 
 * @apiErrorExample Error-Response:
 * 403 만료된 토큰
 * {
 *  "status": 403,
 *  "message": "만료된 토큰입니다. 우리 아기 고앵이 토큰 하나 더 받아와 쪽-"
 * }
 */
router.get("/", auth, async (req, res) => {
  const result = await courseService.library(req.body.user.id);

  res.json(result);
});

router.put("/:id", auth, async (req, res) => {
  const result = await courseService.progress(req.body.user.id, req.params.id);

  res.json(result);
});

router.get("/complete", auth, async (req, res) => {
  const result = await courseService.medal(req.body.user.id);

  res.json(result);
});

module.exports = router;