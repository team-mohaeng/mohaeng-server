import mongoose from "mongoose";
import { IImage } from "../../../../interfaces/IImage";
import { IHashtag } from "../../../../interfaces/IHashtag";

export interface RequestDTO {
  SmallSatisfaction: SmallSatisfactionRequestDTO;
}

export interface SmallSatisfactionRequestDTO {
  user: mongoose.Types.ObjectId;
	content: string;
	images?: [IImage];
	moodImage: string;
	moodText: string;
	hashtags?: [IHashtag];
	isPrivate: boolean;
	date: Date;
}