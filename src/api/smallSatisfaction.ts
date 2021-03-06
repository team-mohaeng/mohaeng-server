import express, { Request, Response } from "express";
import upload from "../modules/upload";
import auth from "../middleware/auth";
import { SmallSatisfactionWriteRequestDTO } from "../dto/SmallSatisfaction/Write/request/SmallSatisfactionWriteDTO";
import smallSatisfactionService from "../service/smallSatisfactionService";


const router = express.Router();


/**
 * @api {post} /api/smallSatisfaction/write 소확행 작성완료
 * 
 * @apiVersion 1.0.0
 * @apiName SmallSatisfactionWrite
 * @apiGroup 소확행
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * form-data 형식
 * KEY(Text): smallSatisfaction, 
 * VALUE : {"content": "오늘 아무생각없이 그림을 그렸는데 생각보다 마음에 든다!", "mood": 2, "isPrivate": false},
 * CONTENT-TYPE: application/json
 * 
 * KEY(File): mainImage,
 * VALUE: 이미지파일
 * 
 * @apiSuccess {String} mainImageUrl
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
    { name: 'mainImage', maxCount: 1 },
  ]),
  auth,
  async (req, res) => {
    let mainImageUrl;

  //main 이미지가 있을 경우
  if ((req as any).files['mainImage']) {
    mainImageUrl = (req as any).files['mainImage'][0].location;
    }
  
  //이미지 없는 경우
  else {
    mainImageUrl = "";
  }
  const smallSatisfactionParams = JSON.parse(req.body.smallSatisfaction);
  const {
    content,
    mood,
    hashtags,
    isPrivate
  } = smallSatisfactionParams;


  const requestDTO: SmallSatisfactionWriteRequestDTO = {
    content: content,
    mood: mood,
    mainImage: mainImageUrl,
    hashtags: hashtags,
    isPrivate: isPrivate,
  };

  const result = await smallSatisfactionService.write(req.body.user.id, requestDTO);
  res.status(result.status).json(result);
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
 * @apiSuccess {Object} myDrawerSmallSatisfactions 포함 속성은 하단 코드 참조
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *    "status": 200,
 *    "data": {
 *      "myDrawerSmallSatisfactions": [
 *        {
 *          "postId": 1,
 *          "nickname": "시원스쿨",
 *          "mood": 2,
 *          "mainImage": "mainImageUrl",
 *          "hashtags": ["#해시태그1", "#해시태그2", ... ],
 *          "content": "맛있는 피자에 시원한 맥주 ... ",
 *          "likeCount": 72,
 *          "hasLike": true,
 *          "year": "2021",
 *          "month": "7",
 *          "day": "11",
 *          "week": "일"
 *        },
 *        {
 *          "postId": 1,
 *          "nickname": "시원스쿨",
 *          "mood": 2,
 *          "mainImage": "mainImageUrl",
 *          "hashtags": ["#해시태그1", "#해시태그2", ... ],
 *          "content": "맛있는 피자에 시원한 맥주 ... ",
 *          "likeCount": 72,
 *          "hasLike": true,
 *          "year": "2021", 
 *          "month": "7",
 *          "day": "11",
 *          "week": "일"
 *         },
 *        ...
 *      ]
 *    }
 * }
 * 
 * @apiErrorExample Error-Response:
 * 404 유저가 유효하지 않은 경우
 * {
 *  "status": 404,
 *  "message": "유저가 존재하지 않습니다."
 * }
 * 
 * 
 * 
 * @apiErrorExample Error-Response:
 * 500 서버 에러
 * {
 *  "status": 500,
 *  "message": "서버 에러입니다."
 * }
 */

router.get("/myDrawer/:year/:month", auth, async (req, res) => {
  const result = await smallSatisfactionService.myDrawer(req.body.user.id, req.params.year, req.params.month);
  res.status(result.status).json(result);
});


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
 * @apiSuccess {Number} hasSmallSatisfaction
 * @apiSuccess {Number} userCount
 * @apiSuccess {Object} community 포함 속성은 하단 코드 참조
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *    "status": 200,
 *    "data": {
 *      "hasSmallSatisfaction": 2,
 *      "userCount": 64,
 *      "community": [
 *        {
 *          "postId": 1,
 *          "nickname": "시원스쿨",
 *          "mood": 2,
 *          "mainImage": "mainImageUrl",
 *          "hashtags": ["#해시태그1", "#해시태그2", ... ],
 *          "content": "맛있는 피자에 시원한 맥주 ... ",
 *          "likeCount": 72,
 *          "hasLike": true,
 *          "year": "2021",
 *          "month": "7",
 *          "day": "13",
 *          "week": "화"
 *        },
 *        {
 *          "postId": 1,
 *          "nickname": "시원스쿨",
 *          "mood": 2,
 *          "mainImage": "mainImageUrl",
 *          "hashtags": ["#해시태그1", "#해시태그2", ... ],
 *          "content": "맛있는 피자에 시원한 맥주 ... ",
 *          "likeCount": 72,
 *          "hasLike": true,
 *          "year": "2021",
 *          "month": "7",
 *          "day": "13",
 *          "week": "화"
 *        },
 *       ...
 *      ]
 *    }
 * }
 * 
 * 
 * 
 * @apiErrorExample Error-Response:
 * 404 유저가 유효하지 않은 경우
 * {
 *  "status": 404,
 *  "message": "유저가 존재하지 않습니다."
 * }
 * 
 * 
 * 
 * @apiErrorExample Error-Response:
 * 500 서버 에러
 * {
 *  "status": 500,
 *  "message": "서버 에러입니다."
 * }
 */

router.get("/community/:sort", auth, async (req, res) => {
  const result = await smallSatisfactionService.community(req.body.user.id, req.params.sort);
  res.status(result.status).json(result);
});


/**
 * @api {get} /api/smallSatisfaction/detail/:postId 소확행 상세보기 조회
 * 
 * @apiVersion 1.0.0
 * @apiName smallSatisfactionDetail
 * @apiGroup 소확행
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 * 
 * @apiSuccess {String} nickname
 * @apiSuccess {Number} postId
 * @apiSuccess {String} mainImage
 * @apiSuccess {Number} mood
 * @apiSuccess {Array} hashtags
 * @apiSuccess {String} content
 * @apiSuccess {Number} likeCount
 * @apiSuccess {Boolean} hasLike
 * @apiSuccess {String} year
 * @apiSuccess {String} month
 * @apiSuccess {String} day
 * @apiSuccess {String} week
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "data": {
 *    "nickname": "시원스쿨",
 *    "postId": 4,
 *    "mainImage": "mainImageUrl",
 *    "mood": 2,
 *    "hashtags": ["#맥주", "#여름"],
 *    "content": "맛있는 피자에 시원한 맥주 ...",
 *    "likeCount": 72,
 *    "hasLike": false,
 *    "year": "2021",
 *    "month": "6",
 *    "day": "29",
 *    "week": "화"
 *  }
 * }
 * 
 * 
 * @apiErrorExample Error-Response:
 * 404 유저가 유효하지 않은 경우
 * {
 *  "status": 404,
 *  "message": "유저가 존재하지 않습니다."
 * }
 * 
 * 
 * @apiErrorExample Error-Response:
 * 404 포스트가 삭제된 경우
 * {
 *  "status": 404,
 *  "message": "글을 불러올 수 없습니다!"
 * }
 * 
 * 
 * 
 * @apiErrorExample Error-Response:
 * 500 서버 에러
 * {
 *  "status": 500,
 *  "message": "서버 에러입니다."
 * }
 */

router.get("/detail/:postId", auth, async (req, res) => {
  const result = await smallSatisfactionService.detail(req.body.user.id, req.params.postId);
  res.status(result.status).json(result);
});

/**
 * @api {put} /api/smallSatisfaction/like/:postId 소확행 좋아요
 * 
 * @apiVersion 1.0.0
 * @apiName smallSatisfactionLike
 * @apiGroup 소확행
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "message": "좋아요 성공!"
 * }
 * 
 * 
 * @apiErrorExample Error-Response:
 * 404 유저가 유효하지 않은 경우
 * {
 *  "status": 404,
 *  "message": "유저가 존재하지 않습니다."
 * }
 * 
 * 
 * @apiErrorExample Error-Response:
 * 404 포스트가 삭제된 경우
 * {
 *  "status": 404,
 *  "message": "글을 불러올 수 없습니다!"
 * }
 * 
 * @apiErrorExample Error-Response:
 * 500 서버 에러
 * {
 *  "status": 500,
 *  "message": "서버 에러입니다."
 * }
 */

router.put("/like/:postId", auth, async (req, res) => {
  const result = await smallSatisfactionService.like(req.body.user.id, req.params.postId);
  res.status(result.status).json(result);
});

/**
 * @api {put} /api/smallSatisfaction/unlike/:postId 소확행 좋아요 취소
 * 
 * @apiVersion 1.0.0
 * @apiName smallSatisfactionUnlike
 * @apiGroup 소확행
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "message": "좋아요 취소 성공!"
 * }
 * 
 * 
 * @apiErrorExample Error-Response:
 * 404 유저가 유효하지 않은 경우
 * {
 *  "status": 404,
 *  "message": "유저가 존재하지 않습니다."
 * }
 * 
 * 
 * @apiErrorExample Error-Response:
 * 404 포스트가 삭제된 경우
 * {
 *  "status": 404,
 *  "message": "글을 불러올 수 없습니다!"
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
                                                                                                                                                                                                                                                               
router.put("/unlike/:postId", auth, async (req, res) => {
  const result = await smallSatisfactionService.unlike(req.body.user.id, req.params.postId);
  res.status(result.status).json(result);
});

/**
 * @api {delete} /api/smallSatisfaction/delete/:postId 소확행 포스트 삭제
 * 
 * @apiVersion 1.0.0
 * @apiName smallSatisfactionUnlike
 * @apiGroup 소확행
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "message" "포스트가 삭제되었습니다."
 * }
 * 
 * 
 * @apiErrorExample Error-Response:
 * 404 유저가 유효하지 않은 경우
 * {
 *  "status": 404,
 *  "message": "유저가 존재하지 않습니다."
 * }
 * 
 * 
 * @apiErrorExample Error-Response:
 * 404 포스트가 삭제된 경우
 * {
 *  "status": 404,
 *  "message": "글을 불러올 수 없습니다!"
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

router.delete("/delete/:postId", auth, async (req, res) => {
  const result = await smallSatisfactionService.delete(req.body.user.id, req.params.postId);
  res.status(result.status).json(result);
});


module.exports = router;

