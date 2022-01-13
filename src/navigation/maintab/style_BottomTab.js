import {StyleSheet} from 'react-native';

export const tab = StyleSheet.create({
	wrap_main: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		backgroundColor: '#FFF',
		height: 140 * DP,
	},
	hitboxLayout: {
		width: 150 * DP,
		height: 140 * DP,
		alignItems: 'center',
	},
	tab_feed: {
		paddingTop: 24 * DP,
		marginLeft: 30 * DP,
	},
	tab_animal_saving: {
		paddingTop: 26 * DP,
	},
	tab_community: {
		paddingTop: 24 * DP,
	},
	tab_my: {
		paddingTop: 24 * DP,
	},
});
