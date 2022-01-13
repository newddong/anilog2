import React from 'react';
import {View, Image, StyleSheet, TouchableHighlight} from 'react-native';

import {text} from '../style_profile';
import {ShelterIcon, AnimalIcon} from 'Asset/image';

import DP from 'Screens/dp';

import WrappedText from 'react-native-wrapped-text';
import FastImage from 'react-native-fast-image';

export default VolunteerItem = ({data}) => {
	return (
		<View style={layout.volunteerItems}>
			<TouchableHighlight
				onPress={() => {
					alert('후원중');
				}}>
				<>
					<FastImage style={layout.volunteerPhoto} source={{uri:data.thumbnail}}></FastImage>
					<View style={layout.volunteerIDtype}>
						{data.type===1 ? (
							<ShelterIcon height="100%" width="100%" />
						) : (
							<AnimalIcon height="100%" width="100%" />
						)}
					</View>
					<WrappedText
						textStyle={[styles.notoSans28, text.aligncenter]}
						rowWrapperStyle={{width: 178 * DP, height: 80 * DP, justifyContent: 'center'}}>
						{data.name}
					</WrappedText>
					<WrappedText
						textStyle={[styles.notoSans24, text.aligncenter]}
						rowWrapperStyle={{width: 178 * DP, height: 35 * DP, justifyContent: 'center'}}>
						{data.location}
					</WrappedText>
					{true ? (
						<WrappedText
							textStyle={[styles.notoSans24, text.aligncenter, text.pink]}
							rowWrapperStyle={{width: 178 * DP, height: 35 * DP, justifyContent: 'center'}}>
							{data.status}
						</WrappedText>
					) : null}
				</>
			</TouchableHighlight>
		</View>
	);
};

const styles = StyleSheet.create({
	notoSans28: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28*DP,
		lineHeight: 38 * DP,
	},
	notoSans24: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24*DP,
		lineHeight: 28 * DP,
	},
});

const layout = StyleSheet.create({
	volunteerPhoto: {
		width: 140 * DP,
		height: 140 * DP,
		borderRadius: 140 * DP,
	},
	volunteerIDtype: {
		width: 48 * DP,
		height: 48 * DP,
		position: 'absolute',
		// left: 19 * DP,
	},
	volunteerItems: {
		width: 178 * DP,
		marginHorizontal: 11 * DP,
		alignItems: 'center',
	},
});
