import mongoose from "mongoose";

export interface RequestDTO {
  SmallSatisfaction: SmallSatisfactionRequestDTO;
}

export interface SmallSatisfactionRequestDTO{
  user: mongoose.Types.ObjectId;
  like: boolean;
}