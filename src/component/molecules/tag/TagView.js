import React from 'react';
import { View} from 'react-native';
import { Tag_View } from 'Atom/icon';
export default TagView = props => {
	return (
		<View style={{ width:110*DP, height:52*DP}}>
			<Tag_View/>
		</View>
	);
};
TagView.defaultProps = {
	
}
