import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {styles} from 'Root/component/atom/image/imageStyle';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Paw30_APRI10, Paw30_Mixed, Paw30_YELL20, ProfileDefaultImg} from 'Atom/icon';

/**
 * 버튼 컴포넌트트
 * @param {object} props - Props Object
 * @param {object} props.data -  UserObject(Pet)과 주인계정의 닉네임
 * @param {(object)=>void} props.onClickLabel - 라벨을 클릭했을 때 동작하는 콜백, 선택된 오브젝트 반환(UserObject -pet )
 */
const PetLabel70 = props => {
	const getStatusMark = () => {
		// console.log('props', props);
		switch (props.data.pet_status) {
			case 'protect':
				return <Paw30_YELL20 />;
			case 'adopt':
				return <Paw30_Mixed />;
			case 'user':
				return;
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
				{props.data.user_profile_uri ? (
					<Image source={{uri: props.data.user_profile_uri}} style={styles.img_round_70} />
				) : (
					<ProfileDefaultImg size={styles.img_round_70} />
				)}
				<View style={{position: 'absolute', top: 0}}>
					{/* 팻의 상태 여부에 따른 분기 - protected, adopted, normal  */}
					{getStatusMark()}
				</View>
			</View>
		</TouchableOpacity>
	);
};

PetLabel70.defaultProps = {
	onClickLabel: e => console.log(e),
	onLabelClick: e => console.log(e),
};
export default PetLabel70;
