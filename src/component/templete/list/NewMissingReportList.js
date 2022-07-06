import React, {useCallback} from 'react';
import {FlatList, ScrollView, Text, View, StyleSheet, SafeAreaView, ActivityIndicator, RefreshControl, Platform} from 'react-native';
import {APRI10, GRAY10, WHITE} from 'Root/config/color';
import {CommonActions, useNavigationState} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import MissingReportBox from 'Root/component/organism/listitem/MissingReportBox ';
import {getMissingReportList} from 'Root/api/feedapi';
import {PROTECT_REQUEST_MAIN_LIMIT} from 'Root/i18n/msg';

const wait = timeout => {
	return new Promise(resolve => setTimeout(resolve, timeout));
};

const NewMissingReportList = props => {
	const [moved, setMoved] = React.useState(false);

	const [topList, setTopList] = React.useState([]);
	const [offset, setOffset] = React.useState(1);
	const [loading, setLoading] = React.useState(false);
	const scrollSpeed = Platform.OS === 'ios' ? 0.4 : 0.55;
	const navigation = useNavigation();
	const renderItem = ({item, index}) => {
		return <MissingReportBox index={index} data={item} />;
	};
	React.useEffect(() => {
		// getList();
		const unsubscribe = navigation.addListener('focus', () => {
			// setShowActionButton(false);
			console.log('foucsued');
			getList();
		});
		getList('first');
		return unsubscribe;
	}, []);

	// React.useEffect(() => {
	// 	console.log('두번 눌림', props.doubleTab);
	// 	if (props.doubleTab) {
	// 		getList();
	// 	}
	// }, [props.doubleTab]);
	const getList = isFirst => {
		if (isFirst != 'first') {
			setLoading(true);
		}

		// console.log('filterData', filterData);
		getMissingReportList(
			{...topList, limit: PROTECT_REQUEST_MAIN_LIMIT, page: offset, main_type: true},
			result => {
				console.log('getMissingReportList length', result.msg.length);
				const res = result.msg;
				if (topList != 'false') {
					let temp = [...topList];
					res.map((v, i) => {
						temp.push(v);
					});
					console.log('temp lenth', temp.length);
					setTopList(temp);
				} else {
					setTopList(res);
				}
				// setTopList(res);
				setOffset(offset + 1);
				setLoading(false);
			},
			err => {
				console.log('getMissingReportList Error', err);
				if (err == '검색 결과가 없습니다.') {
					setData([]);
				}
				setLoading(false);
			},
		);
	};
	// React.useEffect(() => {
	// 	getList();
	// }, []);

	const getItemLayout = useCallback(
		(data, index) => ({
			length: 254 * DP,
			offset: 254 * DP * index,
			index,
		}),
		[],
	);

	const onEndReached = () => {
		// console.log('EndReached', getData().length % PROTECT_REQUEST_MAIN_LIMIT);
		//페이지당 출력 개수인 LIMIT로 나눴을 때 나머지 값이 0이 아니라면 마지막 페이지 => api 접속 불필요
		if (topList.length % PROTECT_REQUEST_MAIN_LIMIT == 0) {
			getList('notfirst');
		}
	};

	return (
		<View style={[styles.container]}>
			<FlatList
				contentContainerStyle={{paddingLeft: 28 * DP}}
				data={topList}
				renderItem={renderItem}
				showsHorizontalScrollIndicator={false}
				horizontal={true}
				onEndReached={onEndReached} //Flatlist 페이징
				onEndReachedThreshold={0.7} //페이징을 하는 타이밍
				// initialNumToRender={20}
				//getItemLayout={getItemLayout}
				//keyExtractor={props.data._id}
				keyExtractor={(item, index) => item._id}
				getItemLayout={(data, index) => {
					return {length: 176 * DP, offset: 176 * DP * index, index: index};
				}}
				windowSize={2}
				// windowSize={5}
				decelerationRate={scrollSpeed}
			/>
			{loading ? (
				<View style={[{alignItems: 'center'}, {alignSelf: 'center'}]}>
					<ActivityIndicator size="large" color={GRAY10} />
				</View>
			) : (
				<></>
			)}
		</View>
	);
	// }
};

const styles = StyleSheet.create({
	container: {
		width: 750 * DP,
		// height: 396 * DP,
		// alignItems: 'center',
		backgroundColor: WHITE,
		marginTop: 28 * DP,
		height: 248 * DP,
		flexDirection: 'row',
		// paddingLeft: 28 * DP,
		// backgroundColor: 'yellow',
		// marginLeft: 28 * DP,
	},
	userContainer: {
		width: 750 * DP,
		// height: 94 * DP,
		marginBottom: 30 * DP,
	},
});

NewMissingReportList.defaultProps = {
	items: [],
	// onClickLabel: e => console.log(e),
};

export default React.memo(NewMissingReportList);
