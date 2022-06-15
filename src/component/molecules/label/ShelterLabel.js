import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Private48, ProfileDefaultImg, Public48} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import {APRI10, BLACK, GRAY10} from 'Root/config/color';
import userGlobalObj from 'Root/config/userGlobalObject';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import FastImage from 'react-native-fast-image';

/**
 * 보호소 Object 정보 박스
 * @param {object} props - Props Object
 * @param {object} props.data - 보호소 UserObject
 * @param {(data:object)=>void} props.onClickLabel - 보호소 UserObject
 */
const ShelterLabel = props => {
	const validation = props.data.user_id == userGlobalObj.userInfo._id;

	const getStatusMark = () => {
		switch (props.data.shelter_type) {
			case 'public':
				return <Public48 />;
			case 'private':
				return <Private48 />;
			default:
				return <></>;
		}
	};

	const onClickLabel = e => {
		props.onClickLabel(props.data);
	};

	return (
		<View style={{flexDirection: 'row', alignItems: 'center'}}>
			<TouchableOpacity onPress={onClickLabel}>
				{props.data.user_profile_uri ? (
					<FastImage source={{uri: props.data.user_profile_uri}} style={styles.img_round_94} />
				) : (
					<ProfileDefaultImg size={styles.img_round_94} />
				)}
			</TouchableOpacity>
			<View style={{position: 'absolute', left: 66 * DP, top: 46 * DP}}>{getStatusMark()}</View>
			<View style={{marginLeft: 30 * DP, paddingVertical: 4 * DP}}>
				<Text style={[txt.roboto28b, {color: validation ? APRI10 : BLACK, maxWidth: 420 * DP}]} numberOfLines={1} ellipsizeMode="tail">
					{props.data.user_nickname || ''}
				</Text>
				<Text style={[txt.noto24, {width: 400 * DP, lineHeight: 44 * DP, color: GRAY10}]} numberOfLines={1} ellipsizeMode="tail">
					{props.data.shelter_address.brief || ''} {props.data.shelter_address.detail || ''}
				</Text>
			</View>
		</View>
	);
};
ShelterLabel.defaultProps = {
	onClickLabel: e => console.log(e),
};
export default ShelterLabel;
