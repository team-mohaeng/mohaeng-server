import mongoose from "mongoose";

export interface IJourneyMessageD {
  _id: mongoose.Types.ObjectId;
	title: string;
  body: string;
	date: Date;
}