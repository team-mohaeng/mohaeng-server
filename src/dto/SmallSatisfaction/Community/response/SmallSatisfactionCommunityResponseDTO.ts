import { IImage } from "../../../../interfaces/IImage";
import { IHashtag } from "../../../../interfaces/IHashtag";

export default interface SmallSatisfactionCommunityResponseDTO {
	status: number;
	data: {
		hasSmallSatisfaction: boolean;
  	userCount: number;
  	community: CommunityResponseDTO[];
	}
}

export interface CommunityResponseDTO {
	postId: number;
	nickname: string;
	moodImage: IImage;
	mainImage: IImage;
	likeCount: number; 
	content: string;
	hasLike: boolean
	hashtags?: [IHashtag];
	year: string;
	month: string;
	day: string;
	date: Date;
}