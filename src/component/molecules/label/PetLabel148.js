import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {styles} from 'Root/component/atom/image/imageStyle';
import DP from 'Root/config/dp';
import {Paw30_APRI10, Paw30_Mixed, Paw30_YELL20, Paw62_APRI10, Paw62_Mixed, Paw62_YELL20, ProfileDefaultImg} from 'Atom/icon';
import FastImage from 'react-native-fast-image';

/**
 * 펫 프로필 라벨 148 사이즈
 * @param {object} props - Props Object
 * @param {object} props.data -  UserObject(Pet)과 주인계정의 닉네임
 * @param {(object)=>void} props.onClickLabel - 라벨을 클릭했을 때 동작하는 콜백, 선택된 오브젝트 반환(UserObject -pet )
 */
const PetLabel148 = props => {
	const getStatusMark = () => {
		// console.log('props', props);
		switch (props.data.pet_status) {
			case 'protect':
				return <Paw62_YELL20 />;
			case 'adopt':
				return <Paw62_Mixed />;
			case 'user':
				return;
			default:
				// return <Paw30_APRI10 />;
				return <Paw62_APRI10 />;
		}
	};

	const onClickLabel = e => {
		props.onLabelClick && props.onLabelClick(props.data);
	};

	return (
		<TouchableOpacity onPress={onClickLabel}>
			<View style={[{flexDirection: 'row', alignItems: 'center'}, {width: 78 * DP}]}>
				{props.data.user_profile_uri ? (
					<FastImage source={{uri: props.data.user_profile_uri}} style={styles.img_round_148} />
				) : (
					<ProfileDefaultImg size={styles.img_round_148} />
				)}
				<View style={{position: 'absolute', top: 45, right: 15}}>
					{/* 팻의 상태 여부에 따른 분기 - protected, adopted, normal  */}
					{getStatusMark()}
				</View>
			</View>
		</TouchableOpacity>
	);
};

PetLabel148.defaultProps = {
	onClickLabel: e => console.log(e),
	onLabelClick: e => console.log(e),
};
export default PetLabel148;
