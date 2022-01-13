import React from 'react';
import { View, TouchableOpacity} from 'react-native';
import DP from 'Root/screens/dp';
import {CameraLinkIcon} from '../atom/icon';
import {styles} from '../atom/image/imageStyle';

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
