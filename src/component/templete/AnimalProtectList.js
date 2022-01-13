import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {getUserProtectAnimalList} from 'Root/api/protectapi';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import AnimalInfoList from '../organism_ksw/AnimalInfoList';
import {login_style, temp_style, baseInfo_style, animalProtectList} from './style_templete';

//접근 테이블 - ProtectAnimalObject, UserObject(pet)
export default AnimalProtectList = ({route}) => {
	const token = route.params;
	const navigation = useNavigation();
	const [data, setData] = React.useState([]); // 최종적으로 AnimalInfoList에 들어갈 임보 동물 정보

	React.useEffect(() => {
		getUserProtectAnimalList(
			{userobject_id: token},
			successed => {
				console.log('success / AnimalProtectList', successed);
				setData(successed.msg);
				//받아오는 list를 setData
			},
			err => {
				console.log('err', err);
			},
		);
	}, [route.params]);

	const onPressLabel = (item, index) => {
		console.log('index', item);
		navigation.push('UserProfile', {userobject: item});
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<ScrollView contentContainerStyle={[animalProtectList.container]}>
				<View style={[animalProtectList.title]}>
					<Text style={[txt.noto24, {color: GRAY10}]}>임시보호 중인 동물</Text>
				</View>
				<View style={[animalProtectList.insideContainer]}>
					<AnimalInfoList items={data} onPressLabel={onPressLabel} />
				</View>
			</ScrollView>
		</View>
	);
};
// user_my_pets: [
// 	ObjectId('61c8220c98117827ac528e0f'),
// 	ObjectId('61d0062707a02d829880289a')
// ],
