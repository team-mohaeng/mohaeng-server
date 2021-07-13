import mongoose from "mongoose";

export interface IChallengeMessageD {
	_id: mongoose.Types.ObjectId;
	title: string;
  body: string;
	date: Date;
}