import React from 'react';
import {FlatList, ScrollView, Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {accountHashList} from 'Organism/style_organism copy';
import UserNote from '../listitem/UserNote';

/**
 * 쪽지 리스트 출력 컴포넌트
 * @param {object} props - Props Object
 * @param {object} props.data - 쪽지 데이터
 * @param {void} props.onClickLabel - 쪽지 라벨 클릭
 * @param {void} props.onCheckBox - 선택 체크박스 클릭
 * @param {boolean} props.checkBoxMode - 선택 삭제 모드 여부 (default= false)
 * @param {boolean} props.showFollowBtn - 선택 삭제 모드 여부 (default= false)
 */
const NoteList = props => {
	console.log('NoteList props', props.data);
	const renderItem = ({item, index}) => {
		console.log('item', item);
		return (
			<View style={[accountHashList.userAccount]}>
				<UserNote
					data={item}
					checkBoxMode={props.checkBoxMode}
					onLabelClick={item => props.onClickLabel(item)}
					onCheckBox={e => props.onCheckBox(e, index)}
				/>
			</View>
		);
	};

	return (
		<View style={[styles.container]}>
			<FlatList
				// extraData={props.data}
				data={props.data}
				// keyExtractor={item => item._id}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={props.whenEmpty}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 750 * DP,
		minHeight: 1322 * DP,
		alignItems: 'center',
	},
	userContainer: {
		width: 750 * DP,
		// height: 94 * DP,
		marginBottom: 40 * DP,
	},
});

NoteList.defaultProps = {
	items: [],
	onClickLabel: e => console.log(e),
	onCheckBox: e => console.log(e),
	checkBoxMode: false, // CheckBox 콘테이너 Show T/F
	showFollowBtn: false,
};

export default NoteList;
