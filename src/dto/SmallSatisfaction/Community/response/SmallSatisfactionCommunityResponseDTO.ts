import mongoose from "mongoose";
import { IHashtag } from "../../../../interfaces/IHashtag";

export interface ResponseDTO {
  SmallSatisfaction: SmallSatisfactionResponseDTO;
}

export interface SmallSatisfactionResponseDTO{
  hasSmallSatisfaction: boolean;
  userCount: number;
  smallSatisfactions: [CommunityResponseDTO];
}

export interface CommunityResponseDTO {
	user: mongoose.Types.ObjectId;
	_id: mongoose.Types.ObjectId;
	postId: number;
	nickname: string;
	likeCount: number; 
	content: string;
	hasLike: boolean
	hasImage: boolean;
	hashtags?: [IHashtag];
	date: Date;
}