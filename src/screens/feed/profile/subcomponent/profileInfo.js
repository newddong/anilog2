import React, {useState} from 'react';
import {Text, View, Image, StyleSheet, TouchableWithoutFeedback,Animated} from 'react-native';

import {txt} from 'Screens/textstyle';
import {DownBracketGray} from 'Asset/image';
import {BracketDown} from 'Asset/image_v2';

import DP from 'Screens/dp';
import SvgWrapper from 'Screens/svgwrapper';
import blankProfile from 'Asset/image/blankProfile.png';
import FastImage from 'react-native-fast-image';
import { GRAY } from 'Root/screens/color';

export default ProfileInfo = props => {
	const [isMore, setMore] = useState(false);


	const more = () => {
		if (isMore) {
			setMore(false);
			return false;
		} else {
			setMore(true);
			return true;
		}
	};

	return (
		<>
			<View style={layout.profileContainer}>
				<View style={layout.profileContents}>
					<View style={layout.profileInfo}>
						<View style={layout.profilePhoto}>
							<FastImage
								source={props.data?.profileImgUri?{uri:props.data.profileImgUri}:blankProfile}
								style={layout.profilePhoto}
							/>
						</View>
						<View style={layout.profileLogs}>
							<ProfileLogItem
								{...{number: props.data.count?.upload, label: '업로드'}}
								onPress={() => alert('업로드')}
							/>
							<ProfileLogItem
								{...{number: props.data.count?.follower, label: '팔로워'}}
								onPress={() => alert('팔로워')}
							/>
							<ProfileLogItem
								{...{number: props.data.count?.following, label: '팔로잉'}}
								onPress={() => alert('팔로잉')}
							/>
						</View>
					</View>
					<View style={layout.profileTextContainer}>
						<Animated.Text style={[layout.profileText, txt.noto24,{lineHeight:40*DP}]}>
							{props.data?.text_intro}
						</Animated.Text>
						<TouchableWithoutFeedback onPress={more}>
							<View style={layout.profileTextMoreView}>
								<Text style={[txt.noto24, txt.gray,{lineHeight:35*DP}]}>더보기</Text>
								<SvgWrapper
									style={[button.profileTextMoreView]}
									svg={<BracketDown fill={GRAY}/>}
								/>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</View>
			</View>
			{isMore && (
				<TouchableWithoutFeedback
					onPress={() => {
						setMore(false);
					}}>
					<View style={layout.area_cancel} />
				</TouchableWithoutFeedback>
			)}
		</>
	);
};

ProfileInfo.defaultProps = {
	onMore: () => {
		alert('undefined');
	},
};

const ProfileLogItem = props => {
	return (
		<TouchableWithoutFeedback onPress={props.onPress}>
			<View style={layout.profileLogItem}>
				<Text style={[txt.roboto30b, txt.center,{lineHeight:38*DP}]}>{props.number}</Text>
				<Text style={[txt.noto24, txt.center,{lineHeight:46*DP}]}>{props.label}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

const layout = StyleSheet.create({
	profileContainer: {
		alignItems: 'center',
		width: '100%',
		// height: 416*DP,
	},
	profileContents: {
		width: '87%',
		// height: '100%',
	},
	profileInfo: {
		flexDirection: 'row',
		flexBasis: 160 * DP,
		// height: 160 * DP,
		marginTop: 6 * DP,
	},
	profilePhoto: {
		width: 160 * DP,
		height: 160 * DP,
		borderRadius: 160 * DP,
	},
	profileLogs: {
		marginTop: 58 * DP,
		marginLeft: 80 * DP,
		width: 366 * DP,
		height: 84 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	profileLogItem: {
		flexDirection: 'column',
		width: 82 * DP,
		height: 84 * DP,
	},
	profileTextContainer: {
		flexDirection: 'row',
		// height: 80 * DP,
		marginTop: 30 * DP,
	},
	profileText: {
		width: 492 * DP,
		// height: 80 * DP,
	},
	profileTextMoreView: {
		height: 40 * DP,
		flexDirection: 'row',
		alignSelf: 'flex-end',
		marginLeft: 46 * DP,
	},
	area_cancel: {
		height: '100%',
		width: '100%',
		position: 'absolute',
		zIndex: 200,
	},
});

const button = StyleSheet.create({
	profileTextMoreView: {
		width: 10,
		height: 6,
		alignSelf: 'center',
		marginLeft: 4,
	},
});
