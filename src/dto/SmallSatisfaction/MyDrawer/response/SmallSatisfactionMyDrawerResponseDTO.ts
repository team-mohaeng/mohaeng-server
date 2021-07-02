import { IHashtag } from "../../../../interfaces/IHashtag";

export default interface SmallSatisfactionMyDrawerResponseDTO {
  smallSatisfactions:[SmallSatisfactionResoponseDTO];
}

export interface SmallSatisfactionResoponseDTO {
	postId: number;
	nickname: string;
	likeCount: number;
	content: string;
	hasLike: boolean;
	hasImage: boolean;
	hashtags?: [IHashtag];
	date: Date;
}