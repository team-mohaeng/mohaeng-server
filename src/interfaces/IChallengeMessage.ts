import mongoose from "mongoose";

export interface IChallengeMessage {
	_id: mongoose.Types.ObjectId;
	title: string;
  body: string;
	date: Date;
}