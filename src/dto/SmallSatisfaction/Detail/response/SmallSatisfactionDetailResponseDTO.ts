import { IHashtag } from "../../../../interfaces/IHashtag";

export interface SmallSatisfactionDetailResponseDTO {
	nickname: string;
	likeCount: number;
	content: string;
	hasLike: boolean;
	hasImage: boolean;
	hashtags?: [IHashtag];
	date: Date;
}