import React from 'react';
import {Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';

import {BackArrow32, Location54_Filled, FavoriteTag48_Filled, FavoriteTag48_Border} from 'Atom/icon';
import DP from 'Root/config/dp';
import {WHITE, APRI10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';

export default BookmarkHeader = ({navigation, route, options, back}) => {
	const [isTagged, setTag] = React.useState(true);

	const toggleTag = () => {
		// if(isTagged){
		//     setTag(false);
		// }else{
		//     setTag(true);
		// }
		(isTagged && (setTag(false) || true)) || setTag(true);
	};
	return (
		<View style={[style.headerContainer]}>
			<TouchableOpacity onPress={navigation.goBack}>
				<View style={style.backButtonContainer}>
					<BackArrow32 onPress={navigation.goBack} />
				</View>
			</TouchableOpacity>
			<Text style={[{flex: 1, textAlign: 'center', marginLeft: 30 * DP, marginRight: 80 * DP}, txt.roboto40b]}>{options.title}</Text>
			{isTagged ? <FavoriteTag48_Filled onPress={toggleTag} /> : <FavoriteTag48_Border onPress={toggleTag} />}
		</View>
	);
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 135 * DP,
		flexDirection: 'row',
		backgroundColor: WHITE,
		paddingHorizontal: 48 * DP,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 126 * DP,
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		elevation: 4,
	},
	backButtonContainer: {
		width: 80 * DP,
		height: 80 * DP,
		justifyContent: 'center',
		padding: 10 * DP,
	},
});
