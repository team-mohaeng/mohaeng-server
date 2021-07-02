import mongoose from "mongoose";
import { IImage } from "../../../../interfaces/IImage";
import { IHashtag } from "../../../../interfaces/IHashtag";

export default interface SmallSatisfactionWriteRequestDTO {
  SmallSatisfaction: SmallSatisfactionRequestDTO;
}

export interface SmallSatisfactionRequestDTO {
	content: string;
	images?: [IImage];
	moodImage: string;
	moodText: string;
	hashtags?: [IHashtag];
	isPrivate: boolean;
	date: Date;
}