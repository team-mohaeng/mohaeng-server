import express, { Request, Response } from "express";
import upload from "../modules/upload";
import { SmallSatisfactionWriteRequestDTO } from "../dto/SmallSatisfaction/Write/request/SmallSatisfactionWriteDTO";
import writeSmallSatisfactionService from "../service/writeSmallSatisfactionService";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: 'moodImage', maxCount: 1 },
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 4 },
  ]), async (req, res) => {
  try{
    let moodImageUrl = (req as any).files['moodImage'][0].location;
    let mainImageUrl, subImages;

    //main, sub 모두 다 있을 경우
    if ((req as any).files['mainImage'] && (req as any).files['subImages']) {
      try {
        subImages = (req as any).files['subImages'];
        for (let i=0; i<subImages.length; i++) {
          subImages[i]=subImages[i].location;
        }
      } catch (err) {
        return res.status(404).json({msg: "사진은 5장까지만 넣어주세요!"});
      }
    }
    else {
      subImages = null;
    }

    //main 이미지만 있을 경우
    if ((req as any).files['mainImage']) {
      mainImageUrl = (req as any).files['mainImage'][0].location;
      }
    
    //이미지 없는 경우
    else {
      mainImageUrl = null;
      subImages = null;
    }
  

    if (req.body.hashtags) {
      if ((req.body.hashtags).length>5) {
        return res.status(404).json({ msg: "해시태그는 5개까지만 넣어주세요!" });
      }
    }
  
    const requestDTO: SmallSatisfactionWriteRequestDTO = {
      content: req.body.content,
      moodText: req.body.moodText,
      moodImage: moodImageUrl,
      mainImage: mainImageUrl,
      subImages: subImages,
      hashtags: req.body.hashtags,
      isPrivate: req.body.isPrivate,
    };

    
    const result = await writeSmallSatisfactionService.smallSatisfaction(requestDTO);
    res.json(result);
  
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;