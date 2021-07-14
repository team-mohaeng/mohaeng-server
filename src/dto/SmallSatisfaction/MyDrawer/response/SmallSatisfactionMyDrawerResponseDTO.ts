import { IImage } from "../../../../interfaces/IImage";
import { IHashtag } from "../../../../interfaces/IHashtag";

export default interface SmallSatisfactionMyDrawerResponseDTO {
	status: number;
	data: {
		myDrawerSmallSatisfactions: myDrawerResponseDTO[];
	}
}

export interface myDrawerResponseDTO {
	postId: number;
	nickname: string;
	mood: number;
	mainImage?: IImage;
	likeCount: number;
	content: string;
	hasLike: boolean;
	hashtags?: [IHashtag];
	year: string;
	month: string;
	day: string;
	week: string;
}