import { IHashtag } from "../../../../interfaces/IHashtag";

export default interface SmallSatisfactionMyDrawerResponseDTO {
	status: number;
	data: [SmallSatisfactionResoponseDTO]
}

interface SmallSatisfactionResoponseDTO {
	postId: number;
	nickname: string;
	likeCount: number;
	content: string;
	hasLike: boolean;
	hasImage: boolean;
	hashtags?: [IHashtag];
	year: string;
	month: string;
	day: string;
	date: Date;
}