import { IHashtag } from "../../../../interfaces/IHashtag";

export interface SmallSatisfactionCommunityResponseDTO {
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