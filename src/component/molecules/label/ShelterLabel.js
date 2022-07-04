import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Private48, ProfileDefaultImg, Public48} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import {APRI10, BLACK, GRAY10, WHITE} from 'Root/config/color';
import userGlobalObj from 'Root/config/userGlobalObject';
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
		return (
			<View
				style={{
					width: 42 * DP,
					height: 42 * DP,
					borderRadius: 10 * DP,
					backgroundColor: BLACK,
					justifyContent: 'center',
				}}>
				<Text style={[txt.noto26b, {color: WHITE, textAlignVertical: 'center', textAlign: 'center'}]}>
					{props.data.shelter_type == 'private' ? '사' : '공'}
				</Text>
			</View>
		);
	};

	const onClickLabel = e => {
		props.onClickLabel(props.data);
	};

	return (
		<View style={{flexDirection: 'row', alignItems: 'center'}}>
			<TouchableOpacity onPress={onClickLabel}>
				{props.data.user_profile_uri ? (
					<>
						<FastImage source={{uri: props.data.user_profile_uri}} style={styles.img_round_94} />
						<View style={{position: 'absolute', right: -10 * DP, bottom: 0}}>{getStatusMark()}</View>
					</>
				) : (
					<ProfileDefaultImg size={styles.img_round_94} />
				)}
			</TouchableOpacity>
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
