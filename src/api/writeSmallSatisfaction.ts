import express, { Request, Response } from "express";
import upload from "../modules/upload";
import auth from "../middleware/auth";
import { SmallSatisfactionWriteRequestDTO } from "../dto/SmallSatisfaction/Write/request/SmallSatisfactionWriteDTO";
import writeSmallSatisfactionService from "../service/writeSmallSatisfactionService";

const router = express.Router();

/**
 * @api {post} /api/writeSmallSatisfaction 소확행 작성
 * 
 * @apiVersion 1.0.0
 * @apiName writeSmallSatisfaction
 * @apiGroup SmallSatisfaction
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZXA0UmhZcmJUSE9uaHpBUldOVFNTMTpBUEE5MWJIS1pGdkJuUkV1dEEtYzQxSmN6dDBITzVJQkNyMFhzM0VadjFFcUZSVl9jY05semtDbFQtaWxmT3FGTUFWTmFPUFYxaVhIQjIybHhrcHZJRWNTNW4tMjQtZzY2SVR1d0o1aW9aWlJtYVd5R1Q3XzZiUDhlR1BOZHd2SkNwUWxZb1daQlhHVCJ9LCJpYXQiOjE2MjU3NjAxOTUsImV4cCI6MTYyNTc5NjE5NX0.jcxHZIN8cT268jCg98674B3rksW7gEb1tkNtfg1SfXU"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *	"moodImage": "moodUrl",
 *	"moodText": "그저 그런 하루",
 *	"content": "소확행 내용",
 *	"hashtags": ["#해시태그1", "#해시태그2", ... ],
 *	"mainImage": "mainImageUrl",
 *	"isPrivate": false 
    }
 *
 * @apiSuccess {String} image
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "data": {
 *    "image" : mainImageUrl
 *  }
 * }
 * 
 * @apiErrorExample Error-Response:
 * 400 해시태그 5개 이상
 * {
 *  "status": 400,
 *  "message": "해시태그는 5개까지만 넣어주세요!"
 * }
 * 
 * 400 해시태그 6글자수 제한
 * {
 *  "status": 400,
 *  "message": "해시태그는 6글자 이내로 작성해주세요!"
 * }
 */

router.post("/", 
  upload.fields([
    { name: 'moodImage', maxCount: 1 },
    { name: 'mainImage', maxCount: 1 },
  ]),
  auth,
  async (req, res) => {
    let moodImageUrl = (req as any).files['moodImage'][0].location;
    let mainImageUrl;

  //main 이미지만 있을 경우
  if ((req as any).files['mainImage']) {
    mainImageUrl = (req as any).files['mainImage'][0].location;
    }
  
  //이미지 없는 경우
  else {
    mainImageUrl = "";
  }

  if (req.body.hashtags) {
    if ((req.body.hashtags).length>5) {
      return res.status(404).json({ msg: "해시태그는 5개까지만 넣어주세요!" });
    }

    req.body.hashtags.forEach((hashtag) => { 
      if (hashtag.length > 7) {
        return res.status(404).json({ msg: "해시태그는 6글자 이내로 작성해주세요!" });
      }
    });
  }

  const requestDTO: SmallSatisfactionWriteRequestDTO = {
    content: req.body.content,
    moodText: req.body.moodText,
    moodImage: moodImageUrl,
    mainImage: mainImageUrl,
    hashtags: req.body.hashtags,
    isPrivate: req.body.isPrivate,
  };

  const result = await writeSmallSatisfactionService.writeSmallSatisfaction(req.body.user.id, requestDTO);
  res.json(result);
});

module.exports = router;