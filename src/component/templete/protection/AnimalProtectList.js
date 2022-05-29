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
import {ANIMAL_PROTECT_LIMIT} from 'Root/i18n/msg';

//UserMenu => 동물 보호 현황
export default AnimalProtectList = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false'); // 최종적으로 AnimalInfoList에 들어갈 임보 동물 정보
	const [offset, setOffset] = React.useState(1);

	React.useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		getUserProtectAnimalList(
			{limit: ANIMAL_PROTECT_LIMIT, page: offset, userobject_id: userGlobalObject.userInfo._id},
			result => {
				console.log('success / AnimalProtectList', result.msg.length);
				const res = result.msg;
				if (data != 'false') {
					setData([...data, ...res]);
				} else {
					setData(res);
				}
				setOffset(offset + 1);
			},
			err => {
				console.log('err', err);
				setData([]);
			},
		);
	};

	//리스트 페이징 작업
	const onEndReached = () => {
		console.log('EndReached', data.length % ANIMAL_PROTECT_LIMIT);
		//페이지당 출력 개수인 LIMIT로 나눴을 때 나머지 값이 0이 아니라면 마지막 페이지 => api 접속 불필요
		//리뷰 메인 페이지에서는 필터가 적용이 되었을 때도 api 접속 불필요
		if (data.length % ANIMAL_PROTECT_LIMIT == 0) {
			fetchData();
		}
	};

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
					showsVerticalScrollIndicator={false}
					renderItem={({item, index}) => (
						<>
							<View style={[animalProtectList.title]}>
								<Text style={[txt.noto24, {color: GRAY10}]}>임시보호 중인 동물</Text>
							</View>
							<View style={[animalProtectList.insideContainer, {}]}>
								<AnimalInfoList items={data} onPressLabel={onPressLabel} whenEmpty={listEmpty} onEndReached={onEndReached} />
							</View>
						</>
					)}
				/>
			</View>
		);
	}
};
