import { IHashtag } from "../../../../interfaces/IHashtag";

export default interface SmallSatisfactionCommunityResponseDTO {
  SmallSatisfaction: SmallSatisfactionResponseDTO;
}

export interface SmallSatisfactionResponseDTO{
  hasSmallSatisfaction: boolean;
  userCount: number;
  smallSatisfactions: [CommunityResponseDTO];
}

export interface CommunityResponseDTO {
	postId: number;
	nickname: string;
	likeCount: number; 
	content: string;
	hasLike: boolean
	hasImage: boolean;
	hashtags?: [IHashtag];
	date: Date;
}