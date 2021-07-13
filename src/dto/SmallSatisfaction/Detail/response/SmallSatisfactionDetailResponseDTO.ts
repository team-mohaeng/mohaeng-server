import { IImage } from "../../../../interfaces/IImage";
import { IHashtag } from "../../../../interfaces/IHashtag";

export default interface SmallSatisfactionDetailResponseDTO {
	status: number;
	data: {
		postId: number;
		nickname: string;
		moodImage: IImage;
		mainImage: IImage;
		likeCount: number;
		content: string;
		hasLike: boolean;
		hashtags?: [IHashtag];
		year: string;
		month: string;
		day: string;
		week: string;
	}
}
