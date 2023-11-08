import { StyleSheet } from "react-native";

export const makeStyles = (isAndroid: boolean) =>  StyleSheet.create({
	mainWrap: {
		justifyContent: 'center',
		width: '100%',
	},
	container: {
		flexShrink: 1,
		borderWidth: 0.5,
		borderColor: '#EEEEEE',
		backgroundColor: 'white',
		borderRadius: 4,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 2,
	},
	flex1: {
		flex: 1,
	},
	flexShrink: {
		height: 300,
		backgroundColor: 'white',
		paddingHorizontal: 6
	},
	wrapTop: {
		justifyContent: 'flex-end',
	},
	dropdown: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		marginVertical: 5,
		fontSize: 16,
	},
	item: {
		padding: 17,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	textItem: {
		flex: 1,
		fontSize: 16,
	},
	icon: {
		width: 20,
		height: 20,
	},
	input: {
		paddingTop: isAndroid? 10: 0,
		marginTop: 5,
		fontSize: 16,
		textAlign: 'left',
		width: '100%',
		paddingHorizontal: 8,
		borderWidth: 0.2,
		borderRadius: 4,
		borderColor: '#8F94AE',
		backgroundColor: 'white',
		height: 60,
	},
	dropdownTextStyles: {
		fontSize: 20,
		textAlign: 'left',
		paddingLeft: 20
	},
	dropdownItem: {
		justifyContent: 'center',
		height: 60,
		marginBottom: 8,
		width: '100%'
	},
	contentInput: {
		flexDirection: 'row',
		borderColor: '#8F94AE',
	},
	label: {
		fontSize: 16,
		textAlign: 'left',
		marginBottom: 8,
		color: '#8F94AE'
	},
});
