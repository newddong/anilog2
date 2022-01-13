import {StyleSheet} from 'react-native';
//deprecated
export const tab = StyleSheet.create({
	wrap_main: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		backgroundColor: '#FFF',
		height: 140 * DP,
	},
	hitboxLayout: {
		width: 100 * DP,
		height: 80 * DP,
		alignItems: 'center',
	},
	tab_feed: {
		marginTop: 24 * DP,
		marginBottom: 4 * DP,
	},
	tab_video: {
		marginTop: 28 * DP,
		marginBottom: 8 * DP,
	},
	tab_animal_saving: {
		marginTop: 26 * DP,
		marginBottom: 6 * DP,
	},
	tab_my: {
		marginTop: 28 * DP,
		marginBottom: 8 * DP,
	},
});

export const layout = StyleSheet.create({
	tab_feed: {
		width: 42 * DP,
		height: 50 * DP,
	},
	tab_video: {
		width: 54 * DP,
		height: 42 * DP,
	},
	tab_animal_saving: {
		width: 58 * DP,
		height: 46 * DP,
	},
	tab_my: {
		width: 46 * DP,
		height: 42 * DP,
	},
});
