import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Private48, Public48} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import {APRI10, BLACK, GRAY10} from 'Root/config/color';
import userGlobalObj from 'Root/config/userGlobalObject';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';

/**
 * 보호소 Object 정보 박스
 * @param {object} props - Props Object
 * @param {object} props.data - 보호소 UserObject
 * @param {(data:object)=>void} props.onClickLabel - 보호소 UserObject
 */
const ShelterLabel = props => {
	const [validation, setValidation] = React.useState(false);
	//user_nickname Text 색깔 조건부적용을 위한 세션아이디 비교
	React.useEffect(() => {
		if (props.data.user_id == userGlobalObj.userInfo._id) {
			setValidation(true); //일치한다면 Validation True로 nickname text color를 바꿈
		}
		return () => {};
	});

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
				<Image source={{uri: props.data.user_profile_uri || DEFAULT_PROFILE}} style={styles.img_round_94} />
			</TouchableOpacity>
			<View style={{position: 'absolute', left: 66 * DP, top: 46 * DP}}>{getStatusMark()}</View>
			<View style={{marginLeft: 30 * DP, paddingVertical: 4 * DP}}>
				<Text style={[txt.roboto28b, {color: validation ? APRI10 : BLACK}]} numberOfLines={1} ellipsizeMode="tail">
					{props.data.shelter_name || ''}
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
