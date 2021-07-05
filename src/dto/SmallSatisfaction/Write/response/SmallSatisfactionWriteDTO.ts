import { IImage } from "../../../../interfaces/IImage"
export interface SmallSatisfactionWriteResponseDTO {
  status: number;
  data: {
    image: IImage;
  }
}