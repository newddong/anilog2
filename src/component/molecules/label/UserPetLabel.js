import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import DP from 'Root/config/dp';
import {styles} from 'Atom/image/imageStyle';

/**
 * 유저가 기르는 반려동물의 프로필 사진, 닉네임, 유저의 닉네임을 출력하는 라벨
 * @param {object} props - Props Object
 * @param {object} props.data - UserObejct
 * @param {(data:object)=>void} props.onClickLabel - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 */
const UserPetLabel = props => {
	const data = props.data;

	const onClickLabel = e => {
		props.onLabelClick(props.data.user_id);
	};

	return (
		<View style={{flexDirection: 'row', alignItems: 'center'}}>
			<TouchableOpacity onPress={onClickLabel}>
				<Image source={{uri: data.user_profile_uri || DEFAULT_PROFILE}} style={styles.img_round_76} />
			</TouchableOpacity>
			<View style={{marginLeft: 20 * DP}}>
				<Text style={[txt.roboto28b]} numberOfLines={1} ellipsizeMode="tail">
					{props.data.user_nickname}
				</Text>
				<Text style={[txt.noto24, {lineHeight: 44 * DP}]} numberOfLines={1} ellipsizeMode="tail">
					{props.data.user_nickname}
				</Text>
			</View>
		</View>
	);
};
UserPetLabel.defaultProps = {
	onClickLabel: e => console.log(e),
};
export default UserPetLabel;
