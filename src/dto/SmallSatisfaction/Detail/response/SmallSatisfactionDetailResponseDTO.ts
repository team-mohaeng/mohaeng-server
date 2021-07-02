import { IHashtag } from "../../../../interfaces/IHashtag";

export default interface SmallSatisfactionDetailResponseDTO {
  smallSatisfactions:[SmallSatisfactionResoponseDTO];
}

export interface SmallSatisfactionResoponseDTO {
	nickname: string;
	likeCount: number;
	content: string;
	hasLike: boolean;
	hasImage: boolean;
	hashtags?: [IHashtag];
	date: Date;
}