import mongoose from "mongoose";

export interface IJourneyMessage {
  _id: mongoose.Types.ObjectId;
	title: string;
  body: string;
	date: Date;
}