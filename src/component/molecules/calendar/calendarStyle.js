import {Dimensions, StyleSheet} from 'react-native';
import {APRI10, BLUE10, GRAY10, LIGHT_SALMON, MIDNIGHT_BLUE, PALETUR, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
export const styles = StyleSheet.create({
	background: {
		backgroundColor: '#0009',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	outside: {
		width: 658 * DP,
		height: 1000 * DP,
		borderRadius: 50 * DP,
		justifyContent: 'space-between',
		backgroundColor: 'white',
	},
	inside: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30 * DP,
		// backgroundColor: WHITE,
	},
	headerCont: {
		// backgroundColor: BLUE10,
		width: 402 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignSelf: 'center',
	},
	monthConatiner: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: 80 * DP,
		height: 80 * DP,
		// backgroundColor: 'red',
	},
	currentMonthContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: 80 * DP,
		height: 80 * DP,
		// backgroundColor: 'red',
	},
	arrowMarkContainer: {
		width: 48 * DP,
		height: 48 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: 'red',
	},
	yearCont: {
		flexDirection: 'row',
	},
	popUpWindow: {
		alignItems: 'center',
	},
	headerText: {
		fontSize: 58 * DP,
		alignItems: 'center',
		alignSelf: 'center',
		color: MIDNIGHT_BLUE,
		textAlign: 'center',
	},

	changeMonthBtn: {
		alignItems: 'center',
		alignSelf: 'center',
		width: 80 * DP,
		height: 80 * DP,
		marginHorizontal: 40 * DP,
	},
	changeMonthText: {
		alignSelf: 'center',
		textAlign: 'center',
		fontSize: 50 * DP,
		color: MIDNIGHT_BLUE,
	},
	changeMonthText_unavailable: {
		alignSelf: 'center',
		textAlign: 'center',
		fontSize: 50 * DP,
		color: '#dcdcdc',
		opacity: 1,
	},
	dateContainer: {
		flexDirection: 'row',
		// alignSelf: 'center',
		justifyContent: 'space-between',
		// marginTop: 50 * DP,
		// backgroundColor: 'pink',
	},
	daysCont: {
		flexDirection: 'row',
		alignSelf: 'center',
		// backgroundColor: 'red',
	},
	daysView: {
		width: 94 * DP,
		height: 54 * DP,
		// marginBottom: -20 * DP,
		paddingTop: 16 * DP,
		opacity: 0.7,
	},
	daysText: {
		fontSize: 30 * DP,
		alignSelf: 'center',
	},
	weekend: {
		fontSize: 30 * DP,
		color: 'red',
		textAlign: 'center',
	},

	days_not_this_month: {
		width: 70 * DP,
		height: 70 * DP,
	},
	days_not_this_month_text: {
		alignSelf: 'center',
		opacity: 0.5,
	},
	days_this_month: {
		width: 94 * DP,
		height: 96 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	today: {
		width: 94 * DP,
		height: 96 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'yellow',
	},
	msg: {
		marginBottom: 30 * DP,
		color: GRAY10,
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1 * DP,
			height: 2 * DP,
		},
		elevation: 2,
	},
	btnCont: {
		width: 604 * DP,
		alignSelf: 'center',
		marginBottom: 30 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});
