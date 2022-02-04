import React from 'react';
import { View, TouchableOpacity} from 'react-native';
import DP from 'Root/config/dp';
import {CameraLinkIcon} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';

export default CameraLink = props => {

	return (
		<TouchableOpacity onPress={props.onClick} style={styles.img_square_186}>
			<View style={{paddingVertical: 58 * DP, paddingHorizontal: 50 * DP}}>
				<CameraLinkIcon />
			</View>
		</TouchableOpacity>
	);
};

CameraLink.defaultProps = {};
