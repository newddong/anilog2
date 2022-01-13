import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import DP from 'Root/config/dp';
import {Paw30_APRI10, Paw30_Mixed, Paw30_YELL20} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';

/**
 * 버튼 컴포넌트트
 * @param {object} props - Props Object
 * @param {object} props.data -  UserObject(Pet)과 주인계정의 닉네임
 * @param {(object)=>void} props.onClickLabel - 라벨을 클릭했을 때 동작하는 콜백, 선택된 오브젝트 반환(UserObject -pet )
 */
const PetLabel = props => {
	const getStatusMark = () => {
		switch (props.data.pet_status) {
			case 'protect':
				return <Paw30_YELL20 />;
			case 'adopt':
				return <Paw30_Mixed />;
			default:
				return <Paw30_APRI10 />;
		}
	};

	const onClickLabel = e => {
		props.onLabelClick && props.onLabelClick(props.data);
	};

	return (
		<TouchableOpacity onPress={onClickLabel}>
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<Image source={{uri: props.data.user_profile_uri || DEFAULT_PROFILE}} style={styles.img_round_94} />
				<View style={{position: 'absolute',top:0}}>
					{/* 팻의 상태 여부에 따른 분기 - protected, adopted, normal  */}
					{getStatusMark()}
				</View>

				<View style={{marginLeft: 30 * DP, width: 300 * DP, paddingVertical: 4 * DP}}>
					{/* Text Box 2개의 Height 총합 86 - profileImage height는 94 = -8 이므로 textBox쪽에 PaddingVertical 4를 줍니다 */}
					{/* Text부분과 프로필이미지 사이의 거리 30 */}

					<Text style={txt.roboto28b} numberOfLines={1} ellipsizeMode="tail">
						{props.data.user_nickname || ''}
					</Text>
					{props.data.owner_nickname&&<Text style={[txt.noto24, {lineHeight: 44 * DP, color: GRAY10}]} numberOfLines={1} ellipsizeMode="tail">
						/  {props.data.owner_nickname}
					</Text>}
					{/* linheight가 망가지는경우 molecules레벨에서 lignHeight 설정을 맞춰서 지정*/}
				</View>
			</View>
		</TouchableOpacity>
	);
};

PetLabel.defaultProps = {
	onClickLabel: e => console.log(e),
	onLabelClick: e => console.log(e),
};
export default PetLabel;
