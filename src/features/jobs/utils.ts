import { STORE } from "@models";
import { OptionsType } from "@ui/components";

export const storesToOption = (data:STORE[]): OptionsType[] => {

	return data.map((store) => ({
		value: store.id,
		label: store.name,
		bgColor: '#fff',
		textColor: "black",
		bold: false,
		disabled: false,
	}));
};
