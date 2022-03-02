import {StyleSheet} from 'react-native';

export const tab = StyleSheet.create({
	wrap_main: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		backgroundColor: '#FFF',
		height: 100 * DP,
	},
	hitboxLayout: {
		width: 150 * DP,
		height: 100 * DP,
		alignItems: 'center',
	},
	tab_feed: {
		paddingTop: 14 * DP,
		marginLeft: 30 * DP,
	},
	tab_animal_saving: {
		paddingTop: 16 * DP,
	},
	tab_community: {
		paddingTop: 14 * DP,
	},
	tab_my: {
		paddingTop: 14 * DP,
	},
});
