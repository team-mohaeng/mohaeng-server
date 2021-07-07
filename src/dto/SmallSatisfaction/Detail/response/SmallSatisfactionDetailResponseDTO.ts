import { IHashtag } from "../../../../interfaces/IHashtag";

export interface SmallSatisfactionDetailResponseDTO {
	status: number; 
		data: {
			nickname: string;
			likeCount: number;
			content: string;
			hasLike: boolean;
			hasImage: boolean;
			hashtags?: [IHashtag];
			year: string;
			month: string;
			day: string;
			date: Date;
		}
}