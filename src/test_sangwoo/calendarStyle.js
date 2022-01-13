import {Dimensions, StyleSheet} from 'react-native';
import {APRI10, BLUE10, GRAY10, LIGHT_SALMON, MIDNIGHT_BLUE, PALETUR, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
export const styles = StyleSheet.create({
	yearCont: {
		flexDirection: 'row',
	},
	outside: {
		// marginTop: 200 * DP,
		// borderRadius: 40 * DP,
		// height: '100%',
		backgroundColor: 'white',
	},
	popUpWindow: {
		// backgroundColor: BLUE10,
		alignItems: 'center',
	},
	headerCont: {
		// backgroundColor: BLUE10,
		flexDirection: 'row',
		alignSelf: 'center',
	},
	headerText: {
		fontSize: 58 * DP,
		alignItems: 'center',
		alignSelf: 'center',
		color: MIDNIGHT_BLUE,
		textAlign: 'center',
	},
	monthConatiner: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: 120 * DP,
		height: 80 * DP,
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
		alignSelf: 'center',
		justifyContent: 'center',
		// marginTop: 50 * DP,
		// backgroundColor: 'pink',
	},
	daysCont: {
		flexDirection: 'row',
		alignSelf: 'center',
	},
	daysView: {
		width: 94 * DP,
		height: 54 * DP,
		marginBottom: -20 * DP,
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
		height: 116 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	today: {
		width: 94 * DP,
		height: 116 * DP,
		justifyContent: 'center',
		alignItems: 'center',
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
});
