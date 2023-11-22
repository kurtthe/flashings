import { FlatListProps, ImageStyle, StyleProp, TextProps, TextStyle, ViewStyle } from "react-native";

export type OptionsType = {
	value: number;
	label: string;
	bgColor: string;
	textColor: string;
	bold: boolean;
	disabled: boolean;
};

export type SelectInputProps = {
	label: string;
	style?: StyleProp<ViewStyle>;
	inputStyles?: TextStyle;
	placeholder?: string;
	containerStyle?: StyleProp<ViewStyle>;
	placeholderStyle?: StyleProp<TextStyle>;
	selectedTextStyle?: StyleProp<TextStyle>;
	selectedTextProps?: TextProps;
	itemContainerStyle?: StyleProp<ViewStyle>;
	itemTextStyle?: StyleProp<TextStyle>;
	inputSearchStyle?: StyleProp<TextStyle>;
	iconStyle?: StyleProp<ImageStyle>;
	maxHeight?: number;
	fontFamily?: string;
	iconColor?: string;
	options: OptionsType[];
	value?: string;
	labelField?: string;
	valueField?: string;
	search?: boolean;
	searchPlaceholder?: string;
	disable?: boolean;
	autoScroll?: boolean;
	showsVerticalScrollIndicator?: boolean;
	dropdownPosition?: 'auto' | 'top' | 'bottom';
	flatListProps?: Omit<FlatListProps<any>, 'renderItem' | 'data'>;
	keyboardAvoiding?: boolean;
	statusBarIsTranslucent?: boolean;
	backgroundColor?: string;
	confirmSelectItem?: boolean;
	onChange: (item: OptionsType) => void;
	valueSearch?: (text?: string) => void;
	renderLeftIcon?: () => JSX.Element | null | undefined;
	renderRightIcon?: () => JSX.Element | null | undefined;
	renderItem?: (
		item: any,
		selected?: boolean,
	) => JSX.Element | null | undefined;
	renderInputSearch?: (
		onSearch: (text: string) => void,
	) => JSX.Element | null | undefined;
	onFocus?: () => void;
	onBlur?: () => void;
	searchQuery?: (keyword: string, labelValue: string) => boolean;
	onChangeText?: (search: string) => void;
	onConfirmSelectItem?: (item: any) => void;
	renderItems?: (item: OptionsType, index: number) => JSX.Element;
	portal?: boolean;
	isRequired?: boolean;
};
