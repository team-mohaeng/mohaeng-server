import mongoose from "mongoose";
import { IHashtag } from "../../../../interfaces/IHashtag";

export interface ResponseDTO {
  smallSatisfactions:[SmallSatisfactionResoponseDTO];
}

export interface SmallSatisfactionResoponseDTO {
	user: mongoose.Types.ObjectId;
	_id: mongoose.Types.ObjectId;
	postId: number;
	nickname: string;
	likeCount: number;
	content: string;
	hasLike: boolean;
	hasImage: boolean;
	hashtags?: [IHashtag];
	date: Date;
}