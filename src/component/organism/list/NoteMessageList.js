import React from 'react';
import {FlatList, ScrollView, Text, View, StyleSheet, ActivityIndicator, RefreshControl} from 'react-native';
import OneMessage from 'Organism/listitem/OneMessage';
import {styles} from 'Root/component/atom/image/imageStyle';
import {useNavigation} from '@react-navigation/core';

/**
 * 쪽지 리스트 출력 컴포넌트
 * @param {object} props - Props Object
 * @param {object} props.data - 쪽지 데이터
 * @param {void} props.onClickLabel - 쪽지 라벨 클릭
 * @param {void} props.onCheckBox - 선택 체크박스 클릭
 * @param {boolean} props.checkBoxMode - 선택 삭제 모드 여부 (default= false)
 * @param {boolean} props.showFollowBtn - 선택 삭제 모드 여부 (default= false)
 */
const NoteMessageList = props => {
	const flatlistRef = React.useRef();

	const navigation = useNavigation();

	const [refreshing, setRefreshing] = React.useState(false); //위로 스크롤 시도 => 리프레싱


	React.useEffect(() => {
		scrollToMsg();
	}, [props.data]);

	const scrollToMsg = () => {
		try {
			if (props.data.length > 0) {
				setTimeout(
					() =>
						flatlistRef.current?.scrollToIndex({
							animated: true,
							index: props.data.length - 1,
							viewPosition: 0,
						}),
					100,
				);
			}
		} catch (err) {
			console.log('err', err);
		}
	};

	const renderItem = ({item, index}) => {
		// console.log('item', item);
		//쪽지부분 정책 결정 필요
		return (
			<View style={[style.messageItemContainer]}>
				<OneMessage data={item} onClick={onClick} />
			</View>
		);
	};

	const onClick = id => {
		console.log('clicked');
		navigation.navigate({key: id, name: 'UserProfile', params: {userobject: id}});
	};


	const wait = timeout => {
		return new Promise(resolve => setTimeout(resolve, timeout));
	};

	const onRefresh = () => {
		setRefreshing(true);
		wait(0).then(() => setRefreshing(false));
	};

	React.useEffect(() => {
		refreshing ? scrollToMsg() : false;
	}, [refreshing]);


	return (
		<View style={style.container}>
			{/* <Text>쪽지 내용 리스트 나오는 화면</Text> */}
			<FlatList
				data={props.data}
				keyExtractor={item => item._id}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				ref={flatlistRef}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				onScrollToIndexFailed={info => {
					const wait = new Promise(resolve => setTimeout(resolve, 500));
					wait.then(() => {
						flatlistRef.current?.scrollToIndex({index: info.index, animated: true});
					});
				}}
			/>
		</View>
	);
};

const style = StyleSheet.create({
	container: {
		// width: 750 * DP,
		flex: 1,
		// height: 1230 * DP,
	},
	messageItemContainer: {
		width: 750 * DP,
		marginBottom: 30 * DP,
		// minHeight: 1150 * DP,
	},
});

export default NoteMessageList;
