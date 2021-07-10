import express, { Request, Response } from "express";
import upload from "../modules/upload";
import auth from "../middleware/auth";
import { SmallSatisfactionWriteRequestDTO } from "../dto/SmallSatisfaction/Write/request/SmallSatisfactionWriteDTO";
import smallSatisfactionMyDrawerService from "../service/smallSatisfactionMyDrawerService";
import smallSatisfactionService from "../service/smallSatisfactionService";


const router = express.Router();

/**
 * @api {post} /api/smallSatisfaction/write 소확행 작성
 * 
 * @apiVersion 1.0.0
 * @apiName writeSmallSatisfaction
 * @apiGroup 소확행
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
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

router.post("/write", 
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

  const result = await smallSatisfactionService.write(req.body.user.id, requestDTO);
  res.json(result);
});

/**
 * @api {get} /api/smallSatisfaction/myDrawer/:year/:month 내서랍장 소확행 글 조회
 * 
 * @apiVersion 1.0.0
 * @apiName smallSatisfactionMyDrawer 
 * @apiGroup 소확행
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 * 
 *
 * @apiSuccess {Array} [myDrawerSmallSatisfactions]
 * @apiSuccess {Number} postId
 * @apiSuccess {String} moodImage
 * @apiSuccess {String} mainImage
 * @apiSuccess {Array} [hashtags]
 * @apiSuccess {String} content
 * @apiSuccess {Number} likeCount
 * @apiSuccess {Boolean} hasLike
 * @apiSuccess {String} nickname
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *	"status": 200,
 *	"data": {
 *			"smallSatisfactions": [
 *			{
 *				"postId": 1
 *				"moodImage": "moodImage.png",
 *        "mainImage": "mainImage.png"
 *				"hashtags": ["#해쉬태그1", "#해쉬태그2", ... ],
 *				"content": "맛있는 피자에 시원한 맥주 ... ",
 *				"likeCount": 72,
 *				"hasLike": true,
 *				"nickname": "시원스쿨"
 *			},
 *			{
 *				"postId": 2
 *				"moodImage": "moodImage.png",
 *        "mainImage": "mainImage.png"
 *				"hashtags": ["#해쉬태그1", "#해쉬태그2", ... ],
 *				"content": "맛있는 피자에 시원한 맥주 ... ",
 *				"likeCount": 72,
 *				"hasLike": true,
 *				"nickname": "시원스쿨"
 *			},
 *		...
 *		]
 *	}
 * }
 * 
 * 
 * @apiErrorExample Error-Response:
 * 500 서버 에러
 * {
 *  "status": 500,
 *  "message": "서버 에러입니다."
 * }
 */
/*
router.get("/myDrawer/:year/:month", auth, async (req, res) => {
  const result = await smallSatisfactionService.myDrawer(req.body.user.id, req.params.year, req.params.month);
  res.json(result);
});
/*

/**
 * @api {get} /api/smallSatisfaction/community/:sort 커뮤니티 소확행 글 조회
 * 
 * @apiVersion 1.0.0
 * @apiName smallSatisfactionCommunity
 * @apiGroup 소확행
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 * 
 *
 * @apiSuccess {Boolean} hasSmallSatisfaction
 * @apiSuccess {Number} userCount
 * @apiSuccess {Array} [smallSatisfactions]
 * @apiSuccess {Number} postId
 * @apiSuccess {String} moodImage
 * @apiSuccess {Array} [hashtags]
 * @apiSuccess {String} content
 * @apiSuccess {Number} likeCount
 * @apiSuccess {Boolean} hasLike
 * @apiSuccess {String} nickname
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *	"status": 200,
 *	"data": {
 *			"hasSmallSaisfacion": false
 *			"userCount": 64
 *			"smallSatisfactions": [
 *			{
 *				"postId": 1
 *				"moodImage": "무드 이미지.png",
 *				"hashtags": ["#해쉬태그1", "#해쉬태그2", ... ],
 *				"content": "맛있는 피자에 시원한 맥주 ... ",
 *				"likeCount": 72,
 *				"hasLike": true,
 *				"nickname": "시원스쿨"
 *			},
 *			{
 *				"postId": 2
 *				"moodImage": "무드 이미지",
 *				"hashtags": ["#해쉬태그1", "#해쉬태그2", ... ],
 *				"content": "맛있는 피자에 시원한 맥주 ... ",
 *				"likeCount": 72,
 *				"hasLike": true,
 *				"nickname": "시원스쿨"
 *			},
 *		...
 *		]
 *	}
 * }
 * 
 * 
 * @apiErrorExample Error-Response:
 * 500 서버 에러
 * {
 *  "status": 400,
 *  "message": "서버 에러입니다."
 * }
 */

router.get("/community/:sort", auth, async (req, res) => {
  const result = await smallSatisfactionService.community(req.body.user.id, req.params.sort);
  res.json(result);
});


module.exports = router;