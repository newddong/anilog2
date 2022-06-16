import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {getUserProtectAnimalList} from 'Root/api/protectapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import Loading from 'Root/component/molecules/modal/Loading';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';
import {ANIMAL_PROTECT_LIMIT, NETWORK_ERROR} from 'Root/i18n/msg';
import DP from 'Root/config/dp';
import Modal from 'Root/component/modal/Modal';
import AnimalInfo from 'Root/component/organism/listitem/AnimalInfo';

//UserMenu => 동물 보호 현황
export default AnimalProtectList = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false'); // 최종적으로 AnimalInfoList에 들어갈 임보 동물 정보
	const [offset, setOffset] = React.useState(1);
	const [total, setTotal] = React.useState();

	React.useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		getUserProtectAnimalList(
			{limit: ANIMAL_PROTECT_LIMIT, page: offset, userobject_id: userGlobalObject.userInfo._id},
			result => {
				console.log('success / AnimalProtectList', result.msg.length);
				setTotal(result.total_count);
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
				if (err.includes('검색 결과가 없습니다')) {
				} else if (err.includes('Network')) {
					Modal.alert(NETWORK_ERROR);
					setData([]);
				} else if (err.includes('code 500')) {
					Modal.alert(NETWORK_ERROR);
					setData([]);
				}
			},
		);
	};

	//리스트 페이징 작업
	const onEndReached = () => {
		console.log('현재 길이', data.length, '최종길이 : ', total);
		//페이지당 출력 개수인 LIMIT로 나눴을 때 나머지 값이 0이 아니라면 마지막 페이지 => api 접속 불필요
		//리뷰 메인 페이지에서는 필터가 적용이 되었을 때도 api 접속 불필요
		if (data.length != total) {
			fetchData();
		}
	};

	const listEmpty = () => {
		return <ListEmptyInfo text={'보호 중인 동물이 없습니다.'} />;
	};

	const onPressLabel = (item, index) => {
		navigation.push('UserProfile', {userobject: item});
	};

	const renderItem = ({item, index}) => {
		return (
			<TouchableOpacity onPress={() => onPressLabel(item, index)} style={[style.itemContainer]}>
				<AnimalInfo data={item} />
			</TouchableOpacity>
		);
	};

	const ITEM_HEIGHT = 210 * DP;

	if (data == 'false') {
		return <Loading isModal={false} />;
	} else {
		return (
			<View style={{flex: 1, backgroundColor: 'white'}}>
				<FlatList
					data={data}
					keyExtractor={item => item._id}
					getItemLayout={(data, index) => {
						if (!data[index]) return {length: 0, offset: 0, index: index};
						return {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index: index};
					}}
					contentContainerStyle={{backgroundColor: '#fff', alignSelf: 'center', width: 750 * DP}}
					renderItem={renderItem}
					onEndReachedThreshold={0.6}
					onEndReached={onEndReached}
					ListEmptyComponent={listEmpty}
				/>
			</View>
		);
	}
};

const style = StyleSheet.create({
	itemContainer: {
		width: 694 * DP,
		height: 210 * DP,
		// marginBottom: 30 * DP,
		backgroundColor: 'white',
		alignSelf: 'center',
	},
});
