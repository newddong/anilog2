import React from 'react';
import {FlatList, ScrollView, Text, View, StyleSheet, SafeAreaView, RefreshControl} from 'react-native';
import {accountHashList} from 'Organism/style_organism copy';
import UserNote from '../listitem/UserNote';

/**
 * 쪽지 리스트 출력 컴포넌트
 * @param {object} props - Props Object
 * @param {object} props.data - 쪽지 데이터
 * @param {void} props.onClickLabel - 쪽지 라벨 클릭
 * @param {void} props.onCheckBox - 선택 체크박스 클릭
 * @param {void} props.refresh - 메시지 갱신
 * @param {boolean} props.checkBoxMode - 선택 삭제 모드 여부 (default= false)
 * @param {boolean} props.showFollowBtn - 선택 삭제 모드 여부 (default= false)
 */
const NoteList = props => {
	const renderItem = ({item, index}) => {
		return (
			<View style={[style.userAccount]}>
				<UserNote
					data={item}
					checkBoxMode={props.checkBoxMode}
					onLabelClick={item => props.onClickLabel(item)}
					onCheckBox={e => props.onCheckBox(e, index)}
				/>
			</View>
		);
	};

	const [refreshing, setRefreshing] = React.useState(false); //위로 스크롤 시도 => 리프레싱

	const wait = timeout => {
		return new Promise(resolve => setTimeout(resolve, timeout));
	};

	const onRefresh = () => {
		setRefreshing(true);
		wait(0).then(() => setRefreshing(false));
	};

	React.useEffect(() => {
		refreshing ? props.refresh() : false;
	}, [refreshing]);

	return (
		<View style={[style.container]}>
			<FlatList
				extraData={props.data}
				data={props.data}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				keyExtractor={item => item._id}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={props.whenEmpty}
			/>
		</View>
	);
};

const style = StyleSheet.create({
	container: {
		width: 750 * DP,
		minHeight: 1322 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	userAccount: {
		width: 750 * DP,
		height: 94 * DP,
		marginTop: 40 * DP,
	},
});

NoteList.defaultProps = {
	items: [],
	onClickLabel: e => console.log(e),
	onCheckBox: e => console.log(e),
	checkBoxMode: false, // CheckBox 콘테이너 Show T/F
	showFollowBtn: false,
	refresh: () => {},
};

export default NoteList;
