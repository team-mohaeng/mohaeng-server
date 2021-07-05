import SmallSatisfaction from "../models/SmallSatisfaction"
import { SmallSatisfactionWriteRequestDTO } from "../dto/SmallSatisfaction/Write/request/SmallSatisfactionWriteDTO"
import { SmallSatisfactionWriteResponseDTO } from "../dto/SmallSatisfaction/Write/response/SmallSatisfactionWriteDTO"
import { dateFormatter } from "../formatter/dateFormatter";

export default {
  smallSatisfaction: async (dto: SmallSatisfactionWriteRequestDTO) => {
    try{
      const {       
        content,
        moodText,
        moodImage,
        mainImage,
        subImages,
        hashtags,
        isPrivate, } = dto;

      const date = dateFormatter();
        
      let smallSatisfaction = new SmallSatisfaction({
        content,
        moodText,
        moodImage,
        mainImage,
        subImages,
        hashtags,
        isPrivate, 
        date,
      })
      await smallSatisfaction.save();

      const responseDTO: SmallSatisfactionWriteResponseDTO = {
        status: 200,
        data: {
          image : mainImage,
        }
      };

      return responseDTO;

    }
    catch (err) {
      console.error(err.message);
    }
  }
}