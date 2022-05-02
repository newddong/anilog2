import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {getUserProtectAnimalList} from 'Root/api/protectapi';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import AnimalInfoList from 'Organism/list/AnimalInfoList';
import {login_style, animalProtectList} from 'Templete/style_templete';
import userGlobalObject from 'Root/config/userGlobalObject';
import Loading from 'Root/component/molecules/modal/Loading';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';

//UserMenu => 동물 보호 현황
export default AnimalProtectList = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false'); // 최종적으로 AnimalInfoList에 들어갈 임보 동물 정보

	React.useEffect(() => {
		getUserProtectAnimalList(
			{userobject_id: userGlobalObject.userInfo._id},
			result => {
				// console.log('success / AnimalProtectList', result);
				setData(result.msg);
			},
			err => {
				console.log('err', err);
				setData([]);
			},
		);
	}, [route.params]);

	const listEmpty = () => {
		return <ListEmptyInfo text={'보호 중인 동물이 없습니다.'} />;
	};

	const onPressLabel = (item, index) => {
		navigation.push('UserProfile', {userobject: item});
	};

	if (data == 'false') {
		return <Loading isModal={false} />;
	} else {
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				<FlatList
					horizontal={false}
					data={[{}]}
					listKey={({item, index}) => index}
					renderItem={({item, index}) => (
						<View style={{}}>
							<View style={[animalProtectList.title]}>
								<Text style={[txt.noto24, {color: GRAY10}]}>임시보호 중인 동물</Text>
							</View>
							<View style={[animalProtectList.insideContainer, {}]}>
								<AnimalInfoList items={data} onPressLabel={onPressLabel} whenEmpty={listEmpty} />
							</View>
						</View>
					)}
				/>
			</View>
		);
	}
};
