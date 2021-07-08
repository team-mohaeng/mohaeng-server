import { IHashtag } from "../../../../interfaces/IHashtag";

export default interface SmallSatisfactionMyDrawerResponseDTO {
	status: number;
	data: [SmallSatisfactionResponseDTO]
}

interface SmallSatisfactionResponseDTO {
	postId: number;
	nickname: string;
	likeCount: number;
	content: string;
	hasLike: boolean;
	hashtags?: [IHashtag];
	year: string;
	month: string;
	day: string;
	date: Date;
}